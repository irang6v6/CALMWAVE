package com.ssafy.calmwave.service;

import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkPeriod;
import com.ssafy.calmwave.dto.PieChartDto;
import com.ssafy.calmwave.dto.RadarChartDto;
import com.ssafy.calmwave.dto.SchedularDto;
import com.ssafy.calmwave.repository.DataCustomRepositoryImpl;
import com.ssafy.calmwave.repository.WorkPeriodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WorkPeriodService {
    private final WorkPeriodRepository workPeriodRepository;
    private final DataCustomRepositoryImpl dataCustomRepository;


    /**
     * 오늘의 총 업무시간
     * @param id
     * @return
     */
    public Optional<Long> findTodayWorkTimeByUserId(Long id) {
        LocalDateTime startOfToday = dataCustomRepository.calculateStartOfToday(LocalDateTime.now());
        return workPeriodRepository.findTodayWorkTimeByUserId(id,startOfToday);
    }


    public List<PieChartDto> findWorkDurationByUserId(Long userId) {
        LocalDateTime startOfToday = dataCustomRepository.calculateStartOfToday(LocalDateTime.now());
        List<Object> objectList = workPeriodRepository.findWorkDurationByUserId(userId,startOfToday);
        List<PieChartDto> pieChartDtoList = new ArrayList<>();
        for (Object object : objectList) {
            Object[] objects = (Object[]) object;
            String id = (String) objects[0];
            String label = (String) objects[1];
            Long duration = (Long) objects[2];
            PieChartDto pieChartDto = new PieChartDto(id, label, duration);
            pieChartDtoList.add(pieChartDto);
        }
        return pieChartDtoList;
    }

    public List<PieChartDto> findWorkDurationByUserAndCategory(Long userId) {
        LocalDateTime startOfToday = dataCustomRepository.calculateStartOfToday(LocalDateTime.now());
        List<Object> objectList = workPeriodRepository.findWorkDurationByUserAndCategory(userId,startOfToday);
        List<PieChartDto> pieChartDtoList = new ArrayList<>();
        for (Object object : objectList) {
            Object[] objects = (Object[]) object;
            String id = (String) objects[0];
            String label = (String) objects[1];
            Long duration = (Long) objects[2];
            PieChartDto pieChartDto = new PieChartDto(id, label, duration);
            pieChartDtoList.add(pieChartDto);
        }
        return pieChartDtoList;
    }

    public List<RadarChartDto> findWorkDurationByUserIdForRadarChart(Long userId){
        return workPeriodRepository.findWorkDurationByUserIdForRadarChart(userId);
    }

    public List<SchedularDto> findByWorkInAndStartTimeAfter(List<Work> works){
        LocalDateTime startOfToday = dataCustomRepository.calculateStartOfToday(LocalDateTime.now());
        List<SchedularDto> schedules = new ArrayList<>();
        List<WorkPeriod> workPeriods = workPeriodRepository.findByWorkInAndStartTimeAfter(works, startOfToday);
        for (WorkPeriod workPeriod : workPeriods) {
            schedules.add(new SchedularDto(workPeriod.getStartTime(),workPeriod.getEndTime(),workPeriod.getWork().getTitle()));
        }
        return schedules;
    }
}
