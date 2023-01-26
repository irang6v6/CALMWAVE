package com.ssafy.calmwave.config.auth;

import com.ssafy.calmwave.config.repository.UserRepository;
import com.ssafy.calmwave.exception.NotFoundUserException;
import com.ssafy.calmwave.model.User;
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
        System.out.println("loadUserByUsername실행중");
        User userEntity = userRepository.findByUsername(username);
        if(userEntity==null){
            throw new NotFoundUserException("잘못된 회원 정보입니다. 이메일이나 비밀번호를 확인하세요.");
        }
        return new PrincipalDetails(userEntity);
    }
}
