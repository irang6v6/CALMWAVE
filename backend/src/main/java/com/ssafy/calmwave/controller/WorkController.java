package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.*;
import com.ssafy.calmwave.dto.WorkCategoryDto;
import com.ssafy.calmwave.dto.WorkPeriodRequestDto;
import com.ssafy.calmwave.dto.WorkRequestDto;
import com.ssafy.calmwave.dto.WorkResponseDto;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import com.ssafy.calmwave.repository.WorkRepository;
import com.ssafy.calmwave.service.WorkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/task")
@Api(tags = "업무 API")
public class WorkController {

    private final JwtUtil jwtUtil;
    private final WorkService workService;
    private final WorkRepository workRepository;

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
        if (work != null) {
            workService.save(work);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "failed");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * User별 Todo를 Order순으로 모두 조회
     *
     * @param token
     * @return List<WorkResponseDto>
     */
    @GetMapping("todo")
    @ApiOperation(value = "해야 할 일 리스트", notes = "todo", response = WorkResponseDto.class)
    public ResponseEntity<?> getTodo(@RequestHeader(value = "AccessToken") String token) {
        User user = jwtUtil.getUser(token);
        List<Work> todo = workService.getTodo(user.getId());
        List<WorkResponseDto> workResponseDtos = workService.convert(todo);
        return ResponseEntity.ok().body(workResponseDtos);
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
        for (int i = 0; i < works.size(); i++) {
            works.get(i).setWorkOrder(i);
        }
        workRepository.saveAll(works);
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
            }else{
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


}