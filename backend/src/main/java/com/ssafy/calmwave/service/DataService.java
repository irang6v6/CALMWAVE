package com.ssafy.calmwave.service;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.dto.DoneTaskDto;
import com.ssafy.calmwave.repository.DataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DataService {

    private final JwtUtil jwtUtil;
    private final DataRepository dataRepository;

    public List<DoneTaskDto> findDoneTaskForToday(Long id) {
        return dataRepository.findDoneTaskForToday(id);
    }


    public List<DoneTaskDto> findDoneTaskForDateRange(Long id, String startDate, String endDate) {
        return dataRepository.findDoneTaskForDateRange(id, startDate, endDate);
    }
}
