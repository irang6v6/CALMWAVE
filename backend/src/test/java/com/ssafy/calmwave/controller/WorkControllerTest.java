package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkRequestDto;
import com.ssafy.calmwave.service.CategoryService;
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
    CategoryService categoryService;
    @Autowired
    WorkService workService;


    @Test
    public void 작업추가_카테고리X() throws Exception {

    }



    @BeforeEach
    public void 유저추가(){

    }

}