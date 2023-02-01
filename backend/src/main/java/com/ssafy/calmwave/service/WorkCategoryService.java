package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WorkCategoryService {

    private final WorkCategoryRepository workCategoryRepository;

    public Optional<WorkCategory> findById(Long workCateId) {
        return workCategoryRepository.findById(workCateId);
    }
}
