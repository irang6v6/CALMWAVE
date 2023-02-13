package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.dto.DoneTaskDto;
import com.ssafy.calmwave.dto.WorkCalenderDto;
import com.ssafy.calmwave.dto.WorkResponseDto;
import com.ssafy.calmwave.service.DataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/data")
@Api(tags = "데이터 시각화 API")
public class DataController {

    private final JwtUtil jwtUtil;
    private final DataService dataService;

    /**
     * 오늘 하루(오늘 새벽 4시부터 내일 새벽 4시까지) 끝낸 일 조회
     *
     * @param token
     * @return List<DoneTaskDto>
     */
    @GetMapping("mypage/done-tasks/today")
    @ApiOperation(value = "오늘 하루 끝낸 일들 리스트", notes = "", response = DoneTaskDto.class)
    public ResponseEntity<?> getDoneTaskForToday(@RequestHeader(value = "AccessToken") String token) {
        User user = jwtUtil.getUser(token);
        List<DoneTaskDto> doneTaskDtos = dataService.findDoneTaskForToday(user.getId());
        return ResponseEntity.ok().body(doneTaskDtos);
    }

    /**
     * 주어진 날짜 범위 (start_date의 새벽 4시부터 end_date의 다음날의 새벽 4시까지) 기준 끝낸 일 조회
     *
     * @param token
     * @return List<DoneTaskDto>
     */
    @GetMapping("mypage/done-tasks/{start_date}/{end_date}")
    @ApiOperation(value = "주어진 날짜 범위 기준 끝낸 일들 리스트", notes = "", response = DoneTaskDto.class)
    public ResponseEntity<?> getDoneTaskForDateRange(@RequestHeader(value = "AccessToken") String token, @PathVariable("start_date") String start_date, @PathVariable("end_date") String end_date) {
        User user = jwtUtil.getUser(token);
        List<DoneTaskDto> doneTaskDtos = dataService.findDoneTaskForDateRange(user.getId(), start_date, end_date);
        return ResponseEntity.ok().body(doneTaskDtos);
    }

}
