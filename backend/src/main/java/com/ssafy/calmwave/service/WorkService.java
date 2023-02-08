package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.*;
import com.ssafy.calmwave.dto.WorkCategoryDto;
import com.ssafy.calmwave.dto.WorkRequestDto;
import com.ssafy.calmwave.dto.WorkResponseDto;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import com.ssafy.calmwave.repository.WorkPeriodRepository;
import com.ssafy.calmwave.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class WorkService {

    private final WorkRepository workRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final WorkCategoryRepository workCategoryRepository;
    private final WorkPeriodRepository workPeriodRepository;

    public Work save(Work work) {
        return workRepository.save(work);
    }

    public List<Work> getTodo(Long userId) {
        return workRepository.findAllByUserIdAndStatusOrderByWorkOrder(userId, WorkStatus.TODO);
    }

    public List<Work> getDone(Long userId) {
        return workRepository.findAllByUserIdAndStatusOrderByWorkOrder(userId, WorkStatus.DONE);
    }

    public Optional<Work> findById(Long workId) {
        return workRepository.findById(workId);
    }

    public void saveWorkPeriod(WorkPeriod workPeriod) {
        workPeriodRepository.save(workPeriod);
    }

    /**
     * WorkRequestDto를 Work Entity로 변환
     *
     * @param user           유저객체
     * @param workRequestDto 제목,내용,목표날짜,카테고리
     * @return Work
     */
    public Work convert(User user, WorkRequestDto workRequestDto) {
        Work work = Work.builder().user(user).title(workRequestDto.getTitle()).description(workRequestDto.getDescription()).status(WorkStatus.TODO).dateAimed(workRequestDto.getDateAimed()).build();

        Optional<WorkCategory> byId1 = categoryService.findById(workRequestDto.getWorkCateId());
        WorkCategory workCategory = byId1.get();
        work.setWorkCate(workCategory);

        return work;
    }


    /**
     * Work Entity를 ResponseDto로 변환
     *
     * @param todo
     * @return list
     */
    public List<WorkResponseDto> convert(List<Work> todo) {
        List<WorkResponseDto> list = todo.stream().map(m ->
                        new WorkResponseDto(m.getId(), m.getTitle(), m.getDescription(), m.getStatus(), m.getDateCreated(), m.getDateAimed(), m.getWorkOrder()
                                , workPeriodRepository.findTimediffByWorkId(m.getId())*1000
                                , new WorkCategoryDto(m.getWorkCate().getId(), m.getWorkCate().getCateName(), m.getWorkCate().getCateColor(), m.getWorkCate().getCateIcon(), m.getWorkCate().getCateOrder())
                        ))
                .collect(Collectors.toList());
        return list;
    }
}
