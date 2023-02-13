package com.ssafy.calmwave.service;

import com.ssafy.calmwave.dto.PieChartDto;
import com.ssafy.calmwave.repository.WorkPeriodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class WorkPeriodService {
    private final WorkPeriodRepository workPeriodRepository;


    public Optional<Long> findTimediffByUserId(Long id) {
        return workPeriodRepository.findTimediffByUserId(id);
    }


    public List<PieChartDto> findWorkDurationByUserId(Long userId) {
        List<Object> objectList = workPeriodRepository.findWorkDurationByUserId(userId);
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
        List<Object> objectList = workPeriodRepository.findWorkDurationByUserAndCategory(userId);
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
}
