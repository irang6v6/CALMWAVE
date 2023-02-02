package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkCategoryRepository extends JpaRepository<WorkCategory, Long> {
    WorkCategory findByCateNameAndUser(String cateName, User user);

    List<WorkCategory> findByUserAndStatus(User user, WorkCategoryStatus valid);
}