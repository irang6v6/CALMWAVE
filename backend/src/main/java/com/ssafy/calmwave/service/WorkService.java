package com.ssafy.calmwave.service;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.*;
import com.ssafy.calmwave.dto.*;
import com.ssafy.calmwave.repository.PastWorkRepository;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import com.ssafy.calmwave.repository.WorkPeriodRepository;
import com.ssafy.calmwave.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class WorkService {

    private final JwtUtil jwtUtil;
    private final WorkRepository workRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final WorkCategoryRepository workCategoryRepository;
    private final WorkPeriodRepository workPeriodRepository;
    private final PastWorkRepository pastWorkRepository;

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
        Work work = Work.builder().user(user).title(workRequestDto.getTitle()).description(workRequestDto.getDescription()).status(WorkStatus.TODO).build(); //second
        Optional<WorkCategory> byId1 = categoryService.findById(workRequestDto.getWorkCateId());
        WorkCategory workCategory = byId1.get();
        work.setWorkCate(workCategory);
        Optional<LocalDateTime> dateAimed = workRequestDto.getDateAimed();
        if (dateAimed.isPresent()) {
            work.setDateAimed(dateAimed.get());
        }
        Optional<Long> timeAimed = workRequestDto.getTimeAimed();
        if (timeAimed.isPresent()) {
            work.setTimeAimed(timeAimed.get() * 60 * 60);
        }
        return work;
    }


    /**
     * Work Entity를 ResponseDto로 변환
     *
     * @param todo
     * @return list
     */
    public List<WorkResponseDto> convert(List<Work> todo) {
        List<WorkResponseDto> list = todo.stream().map(m -> new WorkResponseDto(m.getId(), m.getTitle(), m.getDescription(), m.getStatus(), m.getDateCreated(), m.getDateAimed(), m.getTimeAimed(), m.getWorkOrder(), workPeriodRepository.findTimediffByWorkId(m.getId()), new WorkCategoryDto(m.getWorkCate().getId(), m.getWorkCate().getCateName(), m.getWorkCate().getCateColor(), m.getWorkCate().getCateIcon(), m.getWorkCate().getCateOrder()))).collect(Collectors.toList());
        return list;
    }

    /**
     * work의 user와 token의 user가 동일한지 (업무의 주인이 맞는지)확인
     *
     * @param optionalWork
     * @param token
     * @return
     */
    public boolean checkValid(Optional<Work> optionalWork, String token) {
        return optionalWork.get().getUser().getId().equals(jwtUtil.getUser(token).getId());
    }

    public void deleteById(long workId) {
        workRepository.deleteById(workId);
    }

    public void deleteWorkByCateId(long categoryId) {
        workRepository.deleteAllByWorkCateId(categoryId);
    }

    public boolean checkCateValid(Optional<WorkCategory> optionalWorkCategory, String token) {
        if (categoryService.checkValid(optionalWorkCategory, token) && optionalWorkCategory.get().getStatus() == WorkCategoryStatus.VALID) {
            return true;
        } else {
            return false;
        }
    }

    public List<WorkResponseDoneDto> convertDone(List<Work> done) {
        List<WorkResponseDoneDto> list = done.stream().map(m -> new WorkResponseDoneDto(m.getId(), m.getTitle(), m.getDescription(), m.getStatus(), m.getDateCreated(), m.getDateFinished(), m.getDateAimed(), m.getTimeAimed(), m.getWorkOrder(), workPeriodRepository.findTimediffByWorkId(m.getId()), new WorkCategoryDto(m.getWorkCate().getId(), m.getWorkCate().getCateName(), m.getWorkCate().getCateColor(), m.getWorkCate().getCateIcon(), m.getWorkCate().getCateOrder()))).collect(Collectors.toList());
        return list;
    }

    /**
     * calender에서 조회하는 날짜에 따른 work List 리턴
     *
     * @param userId
     * @param year
     * @param month
     * @param day
     * @return
     */
    public List<WorkDto> findByUserIdAndDate(Long userId, int year, int month, int day) {
        LocalDate searchDate = LocalDate.of(year, month, day);
        Date date = Date.valueOf(searchDate);
//        List<WorkCalenderDto> works = workRepository.findByUserIdAndDate(userId, date);
        List<WorkDto> workDtoList = workRepository.findByUserIdAndBetweenDateCreatedAndDateAimed(userId, date);
        List<WorkDto> workDtoList1 = pastWorkRepository.findByUserIdAndBetweenDateCreatedAndDateAimed(userId, date);
        for (WorkDto w : workDtoList1) {
            workDtoList.add(w);
        }
        return workDtoList;
    }
}
