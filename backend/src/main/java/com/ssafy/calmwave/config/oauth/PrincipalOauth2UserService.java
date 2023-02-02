package com.ssafy.calmwave.config.oauth;

import com.ssafy.calmwave.config.auth.PrincipalDetails;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.repository.UserRepository;
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

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    //구글로부터 받은 UserData에 대한 후처리 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("userRequest getClientRegistration: " + userRequest.getClientRegistration());
        System.out.println("userRequest getAccessToken: " + userRequest.getAccessToken());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("userRequest getAttributes: " + super.loadUser(userRequest).getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String username = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");
        String password = bCryptPasswordEncoder.encode(UUID.randomUUID().toString());
        String role = "ROLE_USER";

        User userEntity = userRepository.findByUsername(email);

        if (userEntity == null) { //처음 들어오는 유저
            System.out.println("OAuth User 회원가입을 진행합니다.");
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
            System.out.println("OAuth User 회원가입 완료");
        } else {
            System.out.println("이미 회원인 유저입니다. 회원 정보를 update합니다.");
            //이미 회원인 유저
            userEntity.setNickname(username);
            userRepository.save(userEntity);
        }

        return new PrincipalDetails(userEntity, oAuth2User.getAttributes()); //session에 들어감
    }
}
