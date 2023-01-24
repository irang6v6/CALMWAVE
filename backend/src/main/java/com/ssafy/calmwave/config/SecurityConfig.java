package com.ssafy.calmwave.config;

import com.ssafy.calmwave.config.jwt.JwtAuthenticationFilter;
import com.ssafy.calmwave.config.jwt.JwtAuthorizationFilter;
import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.config.repository.RefreshTokenRepository;
import com.ssafy.calmwave.config.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilter corsFilter;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;

    @Value("${my.secret}")
    String secret;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();//브라우저간의 정보전달이 없기 때문에 꺼놔도 됨
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션 안쓸게(JWT 쓸거니까)(stateless 서버)
                .and()
                .addFilter(corsFilter) //여기에 넣어놔야 모든 요청이 이 필터를 탄다 //이렇게 하면 crossorigin모두 허용됨 //Controller에 @CrossOrigin붙이는것과의 차이는 시큐리티 필터에 등록 인증 ㅇ
                .formLogin().disable()//JWT서버니까 폼로그인 안함 ( 왜지??)
                .httpBasic().disable() //http header에 authorization에 id,pw를 암호화도 안하고 넣어버리고 요청하는 방식 막겠다, authorization에 token 넣는방식쓰겠다(=bearer) 그리고 그 토큰이 바로 JWT
                .addFilter(new JwtAuthenticationFilter(secret, refreshTokenRepository, authenticationManager(http.getSharedObject(AuthenticationConfiguration.class))))
                .addFilter(new JwtAuthorizationFilter(secret, authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)), userRepository, refreshTokenRepository))
                .authorizeRequests()
                .antMatchers("/api/v1/user/**")
                .access("hasRole('ROLE_USER')")
                .anyRequest().permitAll(); //다른 요청은 모두 열어둘게 //여기까지 JWT서버의 기본 옵션
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
