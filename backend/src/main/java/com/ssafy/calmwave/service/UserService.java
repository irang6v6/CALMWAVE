package com.ssafy.calmwave.service;

import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.dto.UserInfoDto;
import com.ssafy.calmwave.domain.User;

import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void invalidateUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        user.get().setUsername(UUID.randomUUID().toString());
        user.get().setPassword(UUID.randomUUID().toString());
        user.get().setDeleted(Byte.parseByte("1"));
    }

    /**
     * Comment  : 정상적인 이메일 인지 검증.
     */
    public static boolean isValidEmail(String email) {
        boolean err = false;
        String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(email);
        if(m.matches()) {
            err = true;
        }
        return err;
    }

    public void updateUser(UserInfoDto userInfoDto) {
        Optional<User> user = userRepository.findById(userInfoDto.getUserId());
        user.get().setNickname(userInfoDto.getNickname());
        user.get().setStretchingIntervalMin(userInfoDto.getStretchingIntervalMin());
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
