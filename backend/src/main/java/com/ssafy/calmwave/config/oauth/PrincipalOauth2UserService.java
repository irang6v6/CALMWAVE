package com.ssafy.calmwave.config.oauth;

import com.ssafy.calmwave.config.auth.PrincipalDetails;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * * 함수 종료 시 @AuthenticationPrincipal 어노테이션이 만들어진다.
 */
@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final CategoryService categoryService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //구글로부터 받은 UserData에 대한 후처리 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String username = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");
        String password = bCryptPasswordEncoder.encode(UUID.randomUUID().toString());
        String role = "ROLE_USER";

        User userEntity = userRepository.findByUsername(email);

        if (userEntity == null) { //처음 들어오는 유저
            userEntity = User.builder()
                    .password(password)
                    .email(email)
                    .role(role)
                    .provider(provider)
                    .quit(Byte.parseByte("0"))
                    .nickname(username)
                    .stretchingIntervalMin(50)
                    .build();
            userRepository.save(userEntity);
            //기본 카테고리 생성
            categoryService.save(new WorkCategory("기본",userEntity,0,0, WorkCategoryStatus.VALID));
        } else {
            //이미 회원인 유저
            userEntity.setNickname(username);
            userRepository.save(userEntity);
        }
        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
    }
}
