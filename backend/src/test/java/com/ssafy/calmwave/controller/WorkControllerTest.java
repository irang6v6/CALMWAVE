package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkRequestDto;
import com.ssafy.calmwave.service.UserService;
import com.ssafy.calmwave.service.WorkService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback(value = false)
class WorkControllerTest {
    @Autowired
    UserService userService;
    @Autowired
    WorkCategoryService workCategoryService;
    @Autowired
    WorkService workService;


    @Test
    public void 작업추가_카테고리X() throws Exception {
        //given
        /*
         private String title;
        private String description;
        private WorkStatus status;
        private Instant dateAimed;
        private Long userId;
        private Long workCateId
         */
        User byUsername = userService.findByUsername("user1@user.com");
        WorkRequestDto workRequestDto = new WorkRequestDto("task1", "have to do something", LocalDateTime.parse("2023-02-19T18:00:00") , byUsername.getId());
        //when
        Optional<User> byId = userService.findById(workRequestDto.getUserId());
        User user = byId.get();

        Work work = Work.builder()
                .user(user)
                .title(workRequestDto.getTitle())
                .description(workRequestDto.getDescription())
                .status(WorkStatus.TODO)
                .dateAimed(workRequestDto.getDateAimed())
                .build();

        if (workRequestDto.getWorkCateId() != null) {
            Optional<WorkCategory> byId1 = workCategoryService.findById(workRequestDto.getWorkCateId());
            WorkCategory workCategory = byId1.get();
            work.setWorkCate(workCategory);
        }

        Work save = workService.save(work);
        //then
        Assertions.assertThat(save.getTitle()).isEqualTo("task1");
    }



    @BeforeEach
    public void 유저추가(){
        User user=User.builder()
                .email("user1@user.com")
                .password("user1")
                .nickname("유저1")
                .stretchingIntervalMin(50)
                .quit(Byte.parseByte("0"))
                .role("USER_ROLE")
                .build();

        userService.saveUser(user);
    }

}