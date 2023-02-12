package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.dto.UserInfoDto;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.service.CategoryService;
import com.ssafy.calmwave.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1")
@Api(tags = "유저 API")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * 회원가입
     * @param user
     * @return "ok" or "이미 회원에 등록된 이메일 주소입니다."
     */
    @PostMapping("account/join")
    @ApiOperation(value = "회원가입 진행", notes = "")
    public ResponseEntity<?> join(@RequestBody User user) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User findUser = userService.findByUsername(user.getUsername());
        if (findUser == null) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setRole("ROLE_USER");
            user.setDeleted((Byte.parseByte("0")));
            user.setStretchingIntervalMin(50);
            userRepository.save(user);

            //기본 카테고리 생성
            categoryService.save(new WorkCategory("기본",user,0,0, WorkCategoryStatus.VALID));

            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "이미 회원에 등록된 이메일 주소입니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 이메일 중복검사
     * @param email
     * @return true/false 통과(DB에 중복된 email이 없음)일때 true
     */
    @GetMapping("account/checkemail/{email}")
    @ApiOperation(value = "이메일 중복검사 진행", notes = "result:ok")
    public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable("email") String email) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = userService.findByUsername(email);
        if (user == null) {
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "same email already exists");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 로그아웃
     * @param token
     * @return "result":"ok"
     */
    @ApiOperation(value = "로그아웃", notes = "result:ok")
    @GetMapping("user/logout")
    public ResponseEntity<Map<String, Object>> removeToken(@RequestHeader(value = "AccessToken") String token) {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.info("로그아웃");
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = jwtUtil.getUser(token);
        try {
            redisTemplate.delete("RefreshToken:" + user.getUsername());
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            resultMap.put("result", "로그아웃 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 회원 정보 조회
     * @param token
     * @return UserInfoDto
     */
    @GetMapping("user/userinfo")
    @ApiOperation(value = "사용자 정보 조회", notes = "", response = UserInfoDto.class)
    public ResponseEntity<UserInfoDto> getUserInfo(@RequestHeader(value = "AccessToken") String token) {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.info("사용자 정보 조회");
        try {
            User user = jwtUtil.getUser(token);
            return ResponseEntity.ok().body(
                    new UserInfoDto(user.getId(), user.getUsername(), user.getNickname(),
                            user.getStretchingIntervalMin(), user.getDateRegistered()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    /**
     * 회원 탈퇴-민감정보를 지우고 invalidate status로 변경
     * @param token
     * @return "ok"
     */
    @GetMapping("user/withdraw")
    @ApiOperation(value = "회원탈퇴", notes = "result:ok")
    public ResponseEntity<?> signout(@RequestHeader(value = "AccessToken") String token) {

        User user = jwtUtil.getUser(token);

        userService.invalidateUser(user.getId());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "ok");

        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(resultMap);
    }

    /**
     * 사용자 설정 변경
     * @param userInfoDto (Long userId,String nickname,String stretchingIntervalMin)
     * @return
     */
    @PostMapping("/user/update")
    @ApiOperation(value = "사용자의 설정 변경", notes = "result:ok")
    public ResponseEntity changeInfo(@RequestBody UserInfoDto userInfoDto) {
        Map<String, Object> resultMap = new HashMap<>();
        userService.updateUser(userInfoDto);
        resultMap.put("result", "ok");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(resultMap);
    }
}
