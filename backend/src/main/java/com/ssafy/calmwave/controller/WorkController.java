package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.*;
import com.ssafy.calmwave.dto.*;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import com.ssafy.calmwave.repository.WorkRepository;
import com.ssafy.calmwave.service.CategoryService;
import com.ssafy.calmwave.service.WorkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/task")
@Api(tags = "업무 API")
public class WorkController {

    private final JwtUtil jwtUtil;
    private final WorkService workService;
    private final CategoryService categoryService;
    private final WorkRepository workRepository;
    private final WorkCategoryRepository workCategoryRepository;

    /**
     * 업무 추가 (Token으로 유저를 식별한다)
     *
     * @param workRequestDto
     * @return "ok" or "failed"
     */
    @PostMapping("create")
    @ApiOperation(value = "작업 추가", notes = "result:ok")
    public ResponseEntity<?> createTask(@RequestHeader(value = "AccessToken") String token, @RequestBody WorkRequestDto workRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = jwtUtil.getUser(token);
        Work work = workService.convert(user, workRequestDto);
        if ("".equals(workRequestDto.getTitle().trim())) {
            resultMap.put("result", "title is null");
            status = HttpStatus.FORBIDDEN;
        } else if (work != null && work.getWorkCate().getStatus() == WorkCategoryStatus.VALID) {
            workService.save(work);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else if (work.getWorkCate().getStatus() == WorkCategoryStatus.DELETED) {
            resultMap.put("result", "삭제된 카테고리입니다.");
            status = HttpStatus.FORBIDDEN;
        } else {
            resultMap.put("result", "failed");
            status = HttpStatus.FORBIDDEN;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * User별 Todo를 Order순으로 모두 조회, 카테고리와 총 업무시간 포함
     *
     * @param token
     * @return List<WorkResponseDto>
     */
    @GetMapping("todo")
    @ApiOperation(value = "해야 할 일 리스트", notes = "todo", response = WorkResponseDto.class)
    public ResponseEntity<?> getTodo(@RequestHeader("AccessToken") String token) {
//        HttpServletRequest request
//        String token=(String)request.getAttribute("Authorization");
        Logger logger = LoggerFactory.getLogger(JwtUtil.class);
        logger.info("todo : request token: " + token);
        User user = jwtUtil.getUser(token);
        List<Work> todo = workService.getTodo(user.getId());
        List<WorkResponseDto> workResponseDtos = workService.convert(todo);
        return ResponseEntity.ok().body(workResponseDtos);
    }

    /**
     * User별 그날의 DONE을 모두 조회, 카테고리와 총 업무시간 포함
     *
     * @param token
     * @return List<WorkResponseDto>
     */
    @GetMapping("done")
    @ApiOperation(value = "완료된 일 리스트", notes = "done", response = WorkResponseDoneDto.class)
    public ResponseEntity<?> getDone(@RequestHeader(value = "AccessToken") String token) {
        User user = jwtUtil.getUser(token);
        List<Work> done = workService.getDone(user.getId());
        List<WorkResponseDoneDto> workResponseDoneDtos = workService.convertDone(done);
        return ResponseEntity.ok().body(workResponseDoneDtos);
    }

    /**
     * work 순서 변경
     *
     * @param workIDs
     * @return "ok"
     */
    @PostMapping("order")
    public ResponseEntity<?> updateComponentOrder(@RequestBody List<Long> workIDs) {
        List<Work> works = workRepository.findAllById(workIDs);
        int order = 0;
        for (Long workID : workIDs) {
            Optional<Work> optionalWork = workRepository.findById(workID);
            Work work = optionalWork.get();
            work.setWorkOrder(order++);
            workRepository.save(work);
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "ok");
        HttpStatus status = HttpStatus.ACCEPTED;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 연속 업무 시간을 저장
     *
     * @param token
     * @param workPeriodRequestDto
     * @return Http.status
     */
    @PostMapping("workperiod")
    @ApiOperation(value = "연속업무시간 저장", notes = "")
    public ResponseEntity<?> addWorkPeriod(@RequestHeader(value = "AccessToken") String token, @RequestBody WorkPeriodRequestDto workPeriodRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Optional<Work> optionalWork = workService.findById(workPeriodRequestDto.getWorkId());
        if (optionalWork.isPresent()) {
            Work work = optionalWork.get();
            //데이터 요청
            WorkPeriod workPeriod = WorkPeriod.builder()
                    .user(jwtUtil.getUser(token))
                    .work(work)
                    .startTime(workPeriodRequestDto.getStartTime())
                    .endTime(workPeriodRequestDto.getEndTime())
                    .build();
            workService.saveWorkPeriod(workPeriod);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            //요청 실패
            resultMap.put("result", "해당 업무가 존재하지 않습니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * work status를 TODO or DONE 으로 변경
     *
     * @param workRequestDto
     * @return "ok"
     */
    @PostMapping("status")
    @ApiOperation(value = "work status를 변경한다.", notes = "")
    public ResponseEntity<?> join(@RequestBody WorkRequestDto workRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Optional<Work> optionalWork = workService.findById(workRequestDto.getWorkId());
        if (optionalWork.isPresent()) {
            Work work = optionalWork.get();
            work.setStatus(workRequestDto.getWorkStatus());
            if (work.getStatus() == WorkStatus.DONE) { //종료 시간 업데이트
                work.setDateFinished(LocalDateTime.now());
            } else {
                work.setDateFinished(null);
            }
            workRepository.save(work);
            //데이터 요청 성공
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            //요청 실패
            resultMap.put("result", "err");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 업무 수정
     *
     * @param token
     * @param workRequestDto
     * @return
     */
    @PostMapping("update")
    @ApiOperation(value = "업무 수정", notes = "result:ok")
    public ResponseEntity<?> updateWork(@RequestHeader(value = "AccessToken") String token, @RequestBody WorkRequestDto workRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Optional<Work> optionalWork = workService.findById(workRequestDto.getWorkId());
        //업무의 주인이 맞는지 확인
        if (optionalWork.isPresent() && workService.checkValid(optionalWork, token)) {
            Work work = optionalWork.get();
            work.setTitle(workRequestDto.getTitle());
            work.setDescription(workRequestDto.getDescription());

            Optional<LocalDateTime> dateAimed = workRequestDto.getDateAimed();
            if (dateAimed.isPresent()) {
                work.setDateAimed(dateAimed.get());
            }
            Optional<Long> timeAimed = workRequestDto.getTimeAimed();
            if (timeAimed.isPresent()) {
                work.setTimeAimed(timeAimed.get() * 60 * 60);
            }

            Optional<WorkCategory> optionalWorkCategory = workCategoryRepository.findById(workRequestDto.getWorkCateId());
            if (optionalWorkCategory.isPresent()) {
                WorkCategory workCategory = optionalWorkCategory.get();
                if (workService.checkCateValid(optionalWorkCategory, token)) {
                    work.setWorkCate(workCategory);
                    workService.save(work);
                    resultMap.put("result", "ok");
                    status = HttpStatus.ACCEPTED;
                } else {
                    resultMap.put("result", "카테고리가 삭제되었거나 다른 유저의 카테고리를 참조했습니다.");
                    status = HttpStatus.INTERNAL_SERVER_ERROR;
                }
            } else {
                resultMap.put("result", "다른 유저의 업무를 참조했습니다.");
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            resultMap.put("result", "해당 업무를 수정할 권한이 없습니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 업무 삭제
     *
     * @param body(workId)
     * @param token
     * @return
     */
    @PostMapping("delete")
    @ApiOperation(value = "업무 삭제", notes = "result:ok")
    public ResponseEntity<?> deleteWork
    (@RequestBody Map<String, Long> body, @RequestHeader(value = "AccessToken") String token) {
        long workId = body.get("workId");
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Optional<Work> optionalWork = workService.findById(workId);
        //work의 주인이 맞는지 확인
        if (optionalWork.isPresent() && workService.checkValid(optionalWork, token)) {
            workService.deleteById(workId);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "해당 업무를 삭제할 권한이 없습니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


}
