package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.WorkCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkCategoryRepository extends JpaRepository<WorkCategory, Long> {
}