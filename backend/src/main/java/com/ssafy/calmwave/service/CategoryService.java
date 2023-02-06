package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import com.ssafy.calmwave.dto.WorkCategoryDto;
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
        Optional<WorkCategory> byId = categoryRepository.findById(cateId);
        if(byId.isPresent()){
            byId.get().setStatus(WorkCategoryStatus.DELETED);
        }
    }

    public Optional<WorkCategory> findById(Long id) {
        return categoryRepository.findById(id);
    }

    /**
     * 유저가 사용중인 카테고리를 사용자 설정 순서로 조회하는 메소드
     * @param user
     * @return
     */
    public List<WorkCategoryDto> findByUserAndStatus(User user) {
        return categoryRepository.findByUserAndStatus(user.getId(), WorkCategoryStatus.VALID);
    }
}
