package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final WorkCategoryRepository categoryRepository;

    public WorkCategory findByName(String cateName, User user) {
        return categoryRepository.findByCateNameAndUser(cateName,user);
    }

    public WorkCategory save(WorkCategory byName) {
        return categoryRepository.save(byName);
    }

    public void deleteById(Long cateId) {
        categoryRepository.deleteById(cateId);
    }

    public Optional<WorkCategory> findById(Long id) {
        return categoryRepository.findById(id);
    }

    public List<WorkCategory> findByUserAndStatus(User user) {
        return categoryRepository.findByUserAndStatus(user, WorkCategoryStatus.VALID);
    }
}
