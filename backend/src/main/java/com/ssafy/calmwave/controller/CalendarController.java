package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.dto.CalendarRequestDto;
import com.ssafy.calmwave.dto.WorkCalenderDto;
import com.ssafy.calmwave.dto.WorkDto;
import com.ssafy.calmwave.service.WorkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/calendar")
@Api(tags = "캘린더 API")
public class CalendarController {

    private final JwtUtil jwtUtil;
    private final WorkService workService;

    @GetMapping("{year}/{month}/{day}")
    @ApiOperation(value = "", notes = "")
    public ResponseEntity<?> getAllTodo(@RequestHeader(value = "AccessToken") String token, @PathVariable("year") int year, @PathVariable("month") int month, @PathVariable("day") int day) {
        User user = jwtUtil.getUser(token);
        List<WorkDto> list = workService.findByUserIdAndDate(user.getId(), year, month, day);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping("/update")
    @ApiOperation(value = "", notes = "")
    public ResponseEntity<?> join(@RequestHeader(value = "AccessToken") String token, @RequestBody CalendarRequestDto calendarRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = jwtUtil.getUser(token);
        if (user != null) {
            Optional<Work> optionalWork = workService.findById(calendarRequestDto.getWorkId());
            if (optionalWork.isPresent()) {
                Work work = optionalWork.get();
                work.setTitle(calendarRequestDto.getTitle());
                work.setDescription(calendarRequestDto.getDescription());
                work.setDateAimed(calendarRequestDto.getDateAimed());
                workService.save(work); //controller-service-repository를 거치므로 영속성 컨텍스트에서 풀림
                resultMap.put("result", "ok");
                status = HttpStatus.ACCEPTED;
            } else {
                resultMap.put("result", "존재하지 않는 업무입니다.");
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            //요청 실패
            resultMap.put("result", "존재하지 않는 유저입니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}
