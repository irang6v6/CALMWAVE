package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.PostureCName;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.dto.DoneWorkDto;
import com.ssafy.calmwave.service.DataService;
import com.ssafy.calmwave.service.PostureService;
import com.ssafy.calmwave.service.WorkPeriodService;
import com.ssafy.calmwave.service.WorkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/data")
@Api(tags = "데이터 시각화 API")
public class DataController {

    private final JwtUtil jwtUtil;
    private final WorkService workService;
    private final DataService dataService;
    private final PostureService postureService;
    private final WorkPeriodService workPeriodService;

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

    @GetMapping("result")
    @ApiOperation(value = "", notes = "")
    public ResponseEntity<?> resultPage(@RequestHeader(value = "AccessToken") String token) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = jwtUtil.getUser(token);
        if (user != null) {
            Long id = user.getId();
            resultMap.put("result", "ok");
            resultMap.put("todayTotalWorkTime", workPeriodService.findTodayWorkTimeByUserId(id));
            resultMap.put("totalAimedTime", workService.findTotalTimeAimedByUserId(id));
            resultMap.put("averagePostureAlert", 3);
            resultMap.put("pieChartByWork", workPeriodService.findWorkDurationByUserId(id));
            resultMap.put("pieChartByCategory", workPeriodService.findWorkDurationByUserAndCategory(id));
            resultMap.put("radarChart", workPeriodService.findWorkDurationByUserIdForRadarChart(id));
            resultMap.put("numOfTotalWork", workService.getTodo(id).size() + workService.getDone(id).size());
            resultMap.put("numOfUnfinished", workService.getTodo(id).size());
            resultMap.put("numOfDone", workService.getDone(id).size());
            resultMap.put("numOfTurtle", postureService.countByUserAndPostureCName(user, PostureCName.turtle));
            resultMap.put("numOfTilted", postureService.countByUserAndPostureCName(user, PostureCName.tilted));
            resultMap.put("percentOfTodoAndDone", workService.getPercentOfTodoAndDone(id));
            resultMap.put("percentOfWorkTimeAndAimedTime", workService.getPercentOfTotalAndAimedTime(id));
            resultMap.put("schedulerData", workPeriodService.findByWorkInAndStartTimeAfter(workService.findAllByUser(id)));
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "same email already exists");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}
