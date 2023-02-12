package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.PostureCName;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.repository.PostureRepository;
import com.ssafy.calmwave.service.PostureService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/posture")
@Api(tags = "자세 API")
public class PostureController {
    private final JwtUtil jwtUtil;
    private final PostureService postureService;
    private final PostureRepository postureRepository;

    @PostMapping("save")
    @ApiOperation(value = "", notes = "")
    public ResponseEntity<?> join(@RequestBody Map<String, PostureCName> body, @RequestHeader(value = "AccessToken") String token) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = jwtUtil.getUser(token);
        PostureCName postureCName=body.get("className");
        if (user!=null) {
            postureService.save(user,postureCName);
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
