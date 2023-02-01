package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkRequestDto;
import com.ssafy.calmwave.dto.WorkResponseDto;
import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import com.ssafy.calmwave.repository.WorkRepository;
import com.ssafy.calmwave.service.UserService;
import com.ssafy.calmwave.service.WorkCategoryService;
import com.ssafy.calmwave.service.WorkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
@Api(tags = "업무 API")
public class WorkController {

    private final JwtUtil jwtUtil;
    private final WorkService workService;
    private final UserService userService;
    private final WorkCategoryService workCategoryService;

    /**
     * @param workRequestDto
     * @return
     */
    @PostMapping("task/create")
    @ApiOperation(value = "작업 추가", notes = "")
    public ResponseEntity<?> createTask(@RequestBody WorkRequestDto workRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Work work = workService.convert(workRequestDto);
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
     *
     * @param token
     * @return
     */
    @GetMapping("task/todo")
    @ApiOperation(value = "해야 할 일 리스트", notes = "todo")
    public ResponseEntity<?> getTodo(@RequestHeader(value = "AccessToken") String token) {
        User user = jwtUtil.getUser(token);
        List<Work> todo = workService.getTodo(user.getId());
        List<WorkResponseDto> collect = todo.stream()
                .map(m-> new WorkResponseDto(m.getId(),m.getTitle(),m.getDescription(),m.getStatus(),m.getDateCreated(),m.getDateAimed(),m.getWorkCate()))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(collect);
    }
}
