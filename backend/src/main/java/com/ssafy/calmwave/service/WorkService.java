package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkRequestDto;
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

    public Work save(Work work) {
        return workRepository.save(work);
    }

    public Work convert(WorkRequestDto workRequestDto) {
        Optional<User> byId = userService.findById(workRequestDto.getUserId());
        if (byId.isPresent()) {
            User user = byId.get();

            Work work = Work.builder()
                    .user(user)
                    .title(workRequestDto.getTitle())
                    .description(workRequestDto.getDescription())
                    .status(WorkStatus.TODO)
                    .dateAimed(workRequestDto.getDateAimed())
                    .build();

            if (workRequestDto.getWorkCateId() != null) {
                Optional<WorkCategory> byId1 = categoryService.findById(workRequestDto.getWorkCateId());
                WorkCategory workCategory = byId1.get();
                work.setWorkCate(workCategory);
            }
            return work;
        } else {
            return null;
        }


    }

    public List<Work> getTodo(Long userId) {
        return workRepository.findAllByUserIdAndStatus(userId, WorkStatus.TODO);
    }
}
