package com.ssafy.calmwave.service;

import static org.junit.Assert.*;

import com.ssafy.calmwave.repository.UserRepository;
import com.ssafy.calmwave.dto.UserInfoDto;
import com.ssafy.calmwave.domain.User;

import javax.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
class UserServiceTest {

    @Autowired
    EntityManager em;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    @Test
    public void 유저탈퇴() throws Exception {
        User user = new User("member30@member.com", "m30", 50, Byte.parseByte("0"), "member30#",
            "USER_ROLE", "");
        userRepository.save(user);
        User user1 = userRepository.findByUsername(user.getUsername());
        userService.invalidateUser(user1.getId());
        assertEquals("탈퇴 유저는 deleted가 1", user1.getDeleted().toString(), "1");
    }

    @Test
    public void 유저정보변경() throws Exception {
        User user = new User("member30@member.com", "m30", 50, Byte.parseByte("0"), "member30#",
            "USER_ROLE", "");
        userRepository.save(user);

        User byUsername = userRepository.findByUsername(user.getUsername());

        userService.updateUser(new UserInfoDto(byUsername.getId(), "updateNickname", 30));
        assertEquals("닉네임,스트레칭 간격 시간 변경 후", byUsername.getNickname(), "updateNickname");
    }


}