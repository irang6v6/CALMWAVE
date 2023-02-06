package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkRequestDto;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import com.ssafy.calmwave.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WorkService {

    private final WorkRepository workRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final WorkCategoryRepository workCategoryRepository;

    public Work save(Work work) {
        return workRepository.save(work);
    }

    public Work convert(User user, WorkRequestDto workRequestDto) {
        Work work = Work.builder()
                .user(user)
                .title(workRequestDto.getTitle())
                .description(workRequestDto.getDescription())
                .status(WorkStatus.TODO)
                .dateAimed(workRequestDto.getDateAimed())
                .build();

        Optional<WorkCategory> byId1 = categoryService.findById(workRequestDto.getWorkCateId());
        WorkCategory workCategory = byId1.get();
        work.setWorkCate(workCategory);

        return work;
    }

    public List<Work> getTodo(Long userId) {
        return workRepository.findAllByUserIdAndStatusOrderByWorkOrder(userId, WorkStatus.TODO);
    }
}
