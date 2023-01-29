package com.ssafy.calmwave.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

    // 토큰 검증
    public static Boolean tokenValidation(String token) {
        System.out.println(token);
        try {
            System.out.println("토큰 검증 시도");
            String username = JWT.require(Algorithm.HMAC512(secret)).build().verify(token).getClaim("username").asString();
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
                        .plusMinutes(1)
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
                        .plusMinutes(time)
                        .atZone(ZoneId.systemDefault()).toInstant()))
                .withClaim("id", id)
                .withClaim("username", username)
                .sign(Algorithm.HMAC512(secret));
        return token;
    }
}
