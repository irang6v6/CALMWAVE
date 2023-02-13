package com.ssafy.calmwave.service;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.dto.DoneWorkDto;
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

    public List<DoneWorkDto> findDoneWorkForToday(Long id) {
        return dataRepository.findDoneWorkForToday(id);
    }


    public List<DoneWorkDto> findDoneWorkForDateRange(Long id, String startDate, String endDate) {
        return dataRepository.findDoneWorkForDateRange(id, startDate, endDate);
    }
}
