package com.ssafy.calmwave.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.calmwave.config.auth.PrincipalDetails;
import com.ssafy.calmwave.config.repository.RefreshTokenRepository;
import com.ssafy.calmwave.config.repository.UserRepository;
import com.ssafy.calmwave.exception.NotFoundUserException;
import com.ssafy.calmwave.model.User;

import javax.servlet.http.Cookie;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

//권한이나 인증이 필요한 특정 주소를 요청했을때 BasicAuthenticationFilter를 무조건 타게 되어있음
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private String secret;
    private UserRepository userRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private RedisTemplate<String, String> redisTemplate;

    public JwtAuthorizationFilter(String secret, AuthenticationManager authenticationManager, UserRepository userRepository, RedisTemplate<String, String> redisTemplate) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.secret = secret;
        this.redisTemplate = redisTemplate;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//        super.doFilterInternal(request, response, chain);

        String accessToken = request.getHeader("AccessToken");

        //header가 있는지 확인
        if (accessToken == null || !accessToken.startsWith("Bearer")) {
            chain.doFilter(request, response);//가던길가라.
            return;
        }

        String a_token = request.getHeader("AccessToken").replace("Bearer", "");
        String r_token = request.getHeader("RefreshToken").replace("Bearer", "");

        String username = null;

        if (JwtUtil.tokenValidation(a_token)) {
            System.out.println("access토큰이 정상입니다...");
            username = JWT.require(Algorithm.HMAC512(secret)).build().verify(a_token).getClaim("username").asString();
            //continue
        } else if (JwtUtil.tokenValidation(r_token)) {
            System.out.println("access토큰은 유효기간이 지났지만 refresh토큰이 유효합니다. DB와 비교합니다.");
            username = JWT.require(Algorithm.HMAC512(secret)).build().verify(r_token).getClaim("username").asString();

            //Redis에서 RefreshToken가져오기
            String refreshToken = redisTemplate.opsForValue().get("RefreshToken:" + username);
            try {
                refreshToken.equals(request.getHeader("RefreshToken"));
            } catch (Exception e) {
                response.sendError(500, "로그아웃한 유저입니다.");
                throw new NotFoundUserException("로그아웃한 유저입니다.");
            }

            if (refreshToken.equals(request.getHeader("RefreshToken"))) {
                System.out.println("DB확인 완료. RefreshToken으로 AccessToken을 재발급합니다.");
                long id = JWT.require(Algorithm.HMAC512(secret)).build().verify(r_token).getClaim("id").asLong();
                String newAccessToken = JwtUtil.createToken(id, username, JwtUtil.AccessTokenTimeLimit);

                redisTemplate.opsForValue()
                        .set("RefreshToken:" + username, refreshToken,
                                JwtUtil.RefreshTokenTimeLimit, TimeUnit.MILLISECONDS);

                response.addCookie(new Cookie("AccessToken", newAccessToken));
                response.addCookie(new Cookie("RefreshToken", refreshToken));
            } else {
                System.out.println("refreshToken이 DB에 없거나 다릅니다..");
                response.sendError(500, "토큰 불일치, 재로그인 필요");
                return;
            }


        } else {
            System.out.println("로그인을 다시 하셔야 할것같읍니다...");
            response.sendError(500, "로그인 만료, 재로그인 필요");
            return;
        }


        //서명이 정상적으로 됨
        if (username != null) {
            User user = userRepository.findByUsername(username);

            // 인증은 토큰 검증시 끝. 인증을 하기 위해서가 아닌 스프링 시큐리티가 수행해주는 권한 처리를 위해
            // 아래와 같이 토큰을 만들어서 Authentication 객체를 강제로 만들고 그걸 세션에 저장!
            PrincipalDetails principalDetails = new PrincipalDetails(user);
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(
                            principalDetails, //나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
                            null, // 패스워드는 모르니까 null 처리, 어차피 지금 인증하는게 아니니까!!
                            principalDetails.getAuthorities());

            // 강제로 시큐리티의 세션에 접근하여 값 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}
