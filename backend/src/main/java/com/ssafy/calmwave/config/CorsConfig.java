package com.ssafy.calmwave.config;


import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "POST", "GET", "DELETE", "PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        source.registerCorsConfiguration("/**", configuration);
//        CorsConfiguration config=new CorsConfiguration();
//        config.setAllowCredentials(true);//내 서버가 JSON으로 응답을 할 때 자바스크립트에서 처리할 수 있게 할지를 설정하는 것
//        config.addAllowedOrigin("*");//모든 ip에 응답 허용
//        config.addAllowedHeader("*"); //모든 header에 응답 허용
//        config.addAllowedMethod("*"); //무슨 요청(post,get,delete,put,patch)이든 허용을 해두고
//        source.registerCorsConfiguration("/**",config); //api로 들어오는 모든 주소는 이 config를 따라라
        return new CorsFilter(source);
    } //이제 이 녀석을 필터에 등록해줘야함

}
