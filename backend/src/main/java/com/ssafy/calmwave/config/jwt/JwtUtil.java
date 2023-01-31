package com.ssafy.calmwave.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private static final String secret = "calmDown";
    public static final int AccessTokenTimeLimit = 60000 * 60 * 24 * 7;
    public static final int RefreshTokenTimeLimit = 60000 * 60 * 24 * 7;
    private final UserRepository userRepository;

    // 토큰 검증
    public static Boolean tokenValidation(String token) {
        Logger logger = LoggerFactory.getLogger(JwtUtil.class);
        System.out.println("token validation에 들어온 token: " + token);
        logger.info("token validation check");
        try {
            String username = JWT.require(Algorithm.HMAC512(secret)).build().verify(token)
                .getClaim("username").asString();
            return true;
        } catch (Exception ex) {
            System.out.println("불량토큰 발견입니다 발견... ");
            log.error(ex.getMessage());
            return false;
        }
    }

    public static String createToken(long id, String username, int time) {
        String token = JWT.create()
            .withSubject(username)
            .withExpiresAt(Date.from(LocalDateTime.now()
                .plusMinutes(60 * 24)
                .atZone(ZoneId.systemDefault()).toInstant()))
            .withClaim("id", id)
            .withClaim("username", username)
            .sign(Algorithm.HMAC512(secret));
        return token;
    }

    public static String createRefreshToken(long id, String username, int time) {
        String token = JWT.create()
            .withSubject(username)
            .withAudience(username)
            .withExpiresAt(Date.from(LocalDateTime.now()
                .plusMinutes(60 * 24 * 30)
                .atZone(ZoneId.systemDefault()).toInstant()))
            .withClaim("id", id)
            .withClaim("username", username)
            .sign(Algorithm.HMAC512(secret));
        return token;
    }

    // JWT 복호화 해서 유저 얻기
    public User getUser(String token) {
        String accessToken = token.replace("Bearer ", "");

        String username = JWT.require(Algorithm.HMAC512(secret)).build().verify(accessToken)
            .getClaim("username").asString();
        User user = userRepository.findByUsername(username);
        return user;
    }
}
