package com.ssafy.calmwave.repository.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.dto.UserInfoDto;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

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
@RequestMapping("api/v1")
@Api(tags = "유저 API")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * 회원가입 진행
     *
     * @param user
     * @return
     */
    @PostMapping("account/join")
    @ApiOperation(value = "회원가입 진행", notes = "")
    public ResponseEntity<?> join(@RequestBody User user) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User findUser =userService.findByUsername(user.getUsername());
        if (findUser == null) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setRole("ROLE_USER");
            user.setDeleted((Byte.parseByte("0")));
            user.setStretchingIntervalMin(50);
            userRepository.save(user);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "이미 회원에 등록된 이메일 주소입니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * @param email
     * @return true/false 통과(DB에 중복된 email이 없음)일때 true
     */
    @GetMapping("account/checkemail/{email}")
    @ApiOperation(value = "이메일 중복검사 진행", notes = "")
    public ResponseEntity<?> checkEmail(@PathVariable("email") String email) {
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
     * @param userid
     * @return "result":"ok" FRONT에서 store된 Token을 비롯한 UserData 삭제해줘야함
     */
    @ApiOperation(value = "로그아웃", notes = "")
    @GetMapping("user/logout/{userid}")
    public ResponseEntity<?> removeToken(@PathVariable("userid") Long userid) {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.info("로그아웃");
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        try {
            Optional<User> user = userRepository.findById(userid);
            redisTemplate.delete("RefreshToken:" + user.get().getUsername());
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            resultMap.put("result", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 회원 정보 조회
     *
     * @param token
     * @return UserInfoDto
     */
    @GetMapping("user/userinfo")
    @ApiOperation(value = "사용자 정보 조회", notes = "")
    public ResponseEntity getUserInfo(@RequestHeader(value = "AccessToken") String token) {
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
     * 회원 탈퇴
     *
     * @param token
     * @return
     */
    @GetMapping("user/withdraw")
    @ApiOperation(value = "회원탈퇴", notes = "")
    public ResponseEntity<?> signout(@RequestHeader(value = "AccessToken") String token) {

        User user = jwtUtil.getUser(token);

        userService.invalidateUser(user.getId());

        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    /**
     * 사용자 설정 변경
     *
     * @param userInfoDto (Long id,String nickname,String stretchingIntervalMin)
     * @return
     */
    @PostMapping("/user/update")
    @ApiOperation(value = "사용자의 설정 변경", notes = "")
    public ResponseEntity changeInfo(@RequestBody UserInfoDto userInfoDto) {

        userService.updateUser(userInfoDto);

        return ResponseEntity.ok().body(null);
    }
}
