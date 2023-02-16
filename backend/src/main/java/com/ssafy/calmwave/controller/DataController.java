package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.dto.DoneBeforeAimWorksDto;
import com.ssafy.calmwave.dto.DoneWorkDatesDto;
import com.ssafy.calmwave.dto.DoneWorkDto;
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
     * @return List<DoneWorkDto>
     */
    @GetMapping("mypage/done-works/today")
    @ApiOperation(value = "오늘 하루 끝낸 일들 리스트", notes = "", response = DoneWorkDto.class)
    public ResponseEntity<?> getDoneWorkForToday(@RequestHeader(value = "AccessToken") String token) {
        User user = jwtUtil.getUser(token);
        List<DoneWorkDto> doneWorkDtos = dataService.findDoneWorkForToday(user.getId());
        return ResponseEntity.ok().body(doneWorkDtos);
    }

    /**
     * 주어진 날짜 범위 (start_date의 새벽 4시부터 end_date의 다음날의 새벽 4시까지) 기준 끝낸 일 조회
     *
     * @param token
     * @return List<DoneWorkDto>
     */
    @GetMapping("mypage/done-works/{start_date}/{end_date}")
    @ApiOperation(value = "주어진 날짜 범위 기준 끝낸 일들 리스트", notes = "", response = DoneWorkDto.class)
    public ResponseEntity<?> getDoneWorkForDateRange(@RequestHeader(value = "AccessToken") String token, @PathVariable("start_date") String start_date, @PathVariable("end_date") String end_date) {
        User user = jwtUtil.getUser(token);
        List<DoneWorkDto> doneWorkDtos = dataService.findDoneWorkForDateRange(user.getId(), start_date, end_date);
        return ResponseEntity.ok().body(doneWorkDtos);
    }

    /**
     * 오늘 하루(오늘 새벽 4시부터 내일 새벽 4시까지) 기준 존재하는 끝낸 업무 개수 조회
     *
     * @param token
     * @return List<DoneWorkDatesDto>
     */
    @GetMapping("mypage/done-works-cnt/today")
    @ApiOperation(value = "주어진 날짜 범위 기준 존재하는 끝낸 업무 개수", notes = "", response = DoneWorkDatesDto.class)
    public ResponseEntity<?> getDoneWorkDatesForToday(@RequestHeader(value = "AccessToken") String token) {
        User user = jwtUtil.getUser(token);
        Long result = dataService.findDoneWorkCntForToday(user.getId());
        return ResponseEntity.ok().body(result);
    }

    /**
     * 주어진 날짜 범위 (start_date의 새벽 4시부터 end_date의 다음날의 새벽 4시까지) 기준 존재하는 끝낸 업무 날짜 조회
     *
     * @param token
     * @return List<DoneWorkDatesDto>
     */
    @GetMapping("mypage/done-works-dates/{start_date}/{end_date}")
    @ApiOperation(value = "주어진 날짜 범위 기준 존재하는 끝낸 업무 날짜 리스트", notes = "", response = DoneWorkDatesDto.class)
    public ResponseEntity<?> getDoneWorkDatesForDateRange(@RequestHeader(value = "AccessToken") String token, @PathVariable("start_date") String start_date, @PathVariable("end_date") String end_date) {
        User user = jwtUtil.getUser(token);
        List<DoneWorkDatesDto> doneWorkDatesDtos = dataService.findDoneWorkDatesForDateRange(user.getId(), start_date, end_date);
        return ResponseEntity.ok().body(doneWorkDatesDtos);
    }

    /**
     * 주어진 날짜 범위 기준 총 끝낸 업무 수와 목표한 날짜시간 이전에 일을 끝낸 업무 수 조회
     *
     * @param token
     * @return List<DoneBeforeAimWorksDto>
     */
    @GetMapping("mypage/done-before-aim-works-cnt/{start_date}/{end_date}")
    @ApiOperation(value = "주어진 날짜 범위 기준 목표한 날짜시간 이전에 일을 끝낸 업무 수 조회", notes = "", response = DoneBeforeAimWorksDto.class)
    public ResponseEntity<?> getDoneBeforeAimWorksForRange(@RequestHeader(value = "AccessToken") String token, @PathVariable("start_date") String start_date, @PathVariable("end_date") String end_date) {
        User user = jwtUtil.getUser(token);
        Long doneBeforeAimWorksCnt = dataService.findDoneBeforeAimWorksForRange(user.getId(), start_date, end_date);
        return ResponseEntity.ok().body(doneBeforeAimWorksCnt);
    }

}
