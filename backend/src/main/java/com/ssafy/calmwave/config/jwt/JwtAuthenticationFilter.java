package com.ssafy.calmwave.config.jwt;

import com.ssafy.calmwave.config.auth.PrincipalDetails;
import com.ssafy.calmwave.config.repository.RefreshTokenRepository;
import com.ssafy.calmwave.dto.LoginRequestDto;
import com.ssafy.calmwave.model.RefreshToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final String secret;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManager authenticationManager;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        System.out.println("로그인 시도중... ");

        //1. 로그인,패스워드 받아서
        // request에 있는 username과 password를 파싱해서 자바 Object로 받기
        ObjectMapper om = new ObjectMapper();
        LoginRequestDto loginRequestDto = null;
        try {
            loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //principalDetailsService에 loadUserByUsername이 실행됨
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        //log출력을 위한 로직
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println(principalDetails.getUser().getUsername());

        return authentication;
    }

    //JWT토큰을 만들어서 request요청한 사용자에게 JWT토큰을 response해주면 됨
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        System.out.println("로그인 성공, AccessToken을 발급합니다.");

        String accessToken = JwtUtil.createToken(secret,principalDetails.getUser().getId(), principalDetails.getUsername(), JwtUtil.AccessTokenTimeLimit);
        String newRefreshToken = JwtUtil.createToken(secret,principalDetails.getUser().getId(), principalDetails.getUsername(), JwtUtil.RefreshTokenTimeLimit);

        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByUsername(principalDetails.getUsername());


        //DB에 refresh token 저장
        if (refreshToken.isPresent()) {
            System.out.println("Refresh Token을 가진 사용자. RefreshToken을 update");
            refreshTokenRepository.save(
                    refreshToken.get().updateToken(newRefreshToken));
        } else {
            System.out.println("Refresh Token이 없는 사용자. RefreshToken을 create");
            refreshTokenRepository.save(new RefreshToken(
                    newRefreshToken, principalDetails.getUsername()));
        }

        response.addHeader("AccessToken", accessToken);
        response.addHeader("RefreshToken", refreshTokenRepository.findByUsername(principalDetails.getUsername()).get().getRefreshToken());
        response.addHeader("userId",principalDetails.getUser().getId()+"");

    }
}
