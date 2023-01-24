package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.repository.RefreshTokenRepository;
import com.ssafy.calmwave.config.repository.UserRepository;
import com.ssafy.calmwave.model.RefreshToken;
import com.ssafy.calmwave.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
public class RestApiController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @GetMapping
    public String home() {
        return "<h1>hi<h1>";
    }

    @PostMapping("/join")
    public String join(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        user.setQuit(0);
        user.setStretchingIntervalMin(50);
        userRepository.save(user);
        return "회원가입완료";
    }

    /**
     * @param email
     * @return true/false
     * 통과(DB에 중복된 email이 없음)일때 true
     */
    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable("email") String email) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = userRepository.findByUsername(email);
        if (user == null) {
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "same email already exists");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/user")
    public String user() {
        return "user";
    }

    /**
     * @param userid
     * @return "result":"ok"
     * FRONT에서 store된 Token을 비롯한 UserData 삭제해줘야함
     */
    @GetMapping("/logout/{userid}")
    public ResponseEntity<?> removeToken(@PathVariable("userid") Long userid) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        try {
            Optional<User> user = userRepository.findById(userid);
            Optional<RefreshToken> refreshToken = refreshTokenRepository.findByUsername(user.get().getUsername());
            refreshTokenRepository.deleteById(refreshToken.get().getId());
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            resultMap.put("result", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}
