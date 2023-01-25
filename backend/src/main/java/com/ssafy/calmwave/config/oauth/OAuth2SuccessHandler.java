package com.ssafy.calmwave.config.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.calmwave.config.auth.PrincipalDetails;
import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.model.User;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final String secret="calmdown";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication)
        throws IOException, ServletException {
        System.out.println("OAuth2 AuthenticationSuccessed");
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("OAuth User : "+principal.getUser().getNickname()+"님이 로그인합니다. ");

        String accessToken=jwtUtil.createToken(secret,principal.getUser().getId(),principal.getUser().getUsername(),JwtUtil.AccessTokenTimeLimit);
        String refreshToken=jwtUtil.createToken(secret,principal.getUser().getId(),principal.getUser().getUsername(),JwtUtil.AccessTokenTimeLimit);

        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/sign")
            .build().toUriString();
        /**
         * .queryParam("accessToken", accessToken)
         *             .queryParam("refreshToken",refreshToken)
         */

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        System.out.println("targetUrl : "+targetUrl);
        response.addHeader("AccessToken",accessToken);
        response.addHeader("RefreshToken",refreshToken);

//        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);


//        User user = principalDetails.getUser();
//        Map<String, Object> attributes = principalDetails.getAttributes();
//
//        String targetUrl;
//
//        String accessToken = JwtUtil.createToken(secret, principalDetails.getUser().getId(),
//            principalDetails.getUsername(), JwtUtil.AccessTokenTimeLimit);
//        String refreshToken = JwtUtil.createToken(secret, principalDetails.getUser().getId(),
//            principalDetails.getUsername(), JwtUtil.RefreshTokenTimeLimit);
//        targetUrl = UriComponentsBuilder.fromUriString("/home")
//            .queryParam("AccessToken", accessToken)
//            .queryParam("RefreshToken", refreshToken)
//            .build().toUriString();
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

}
