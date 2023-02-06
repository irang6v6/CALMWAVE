package com.ssafy.calmwave.config.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.exception.NotFoundUserException;
import com.ssafy.calmwave.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.info("loadUserByUsername에서 로그인 시도");
        User userEntity = userRepository.findByUsername(username);
        if (userEntity == null) {
            throw new NotFoundUserException("잘못된 회원 정보입니다. 이메일이나 비밀번호를 확인하세요.");
        }
        return new PrincipalDetails(userEntity);
    }


}
