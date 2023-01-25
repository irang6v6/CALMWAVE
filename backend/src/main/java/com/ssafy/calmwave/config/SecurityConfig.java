package com.ssafy.calmwave.config;

import com.ssafy.calmwave.config.jwt.JwtAuthenticationFilter;
import com.ssafy.calmwave.config.jwt.JwtAuthorizationFilter;
import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.config.oauth.OAuth2AuthenticationSuccessHandler;
import com.ssafy.calmwave.config.oauth.OAuth2SuccessHandler;
import com.ssafy.calmwave.config.oauth.PrincipalOauth2UserService;
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
    private final PrincipalOauth2UserService principalOauth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Value("${my.secret}")
    String secret;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();//브라우저간의 정보전달이 없기 때문에 꺼놔도 됨
        http.sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션 안쓸게(JWT 쓸거니까)(stateless 서버)
            .and()
            .addFilter(corsFilter)
            .formLogin().disable()
            .httpBasic().disable()
            .authorizeRequests()
            .antMatchers("/api/v1/user/**")
            .access("hasRole('ROLE_USER')")
            .anyRequest().permitAll()
            .and()
            .addFilter(new JwtAuthenticationFilter(secret, refreshTokenRepository,
                authenticationManager(http.getSharedObject(AuthenticationConfiguration.class))))
            .addFilter(new JwtAuthorizationFilter(secret,
                authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)),
                userRepository, refreshTokenRepository))
            .oauth2Login()
            .userInfoEndpoint()
            .userService(principalOauth2UserService)
            .and()
            .successHandler(oAuth2AuthenticationSuccessHandler);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration)
        throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


}
