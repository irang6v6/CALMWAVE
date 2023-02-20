package com.ssafy.calmwave.service;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.dto.DoneBeforeAimWorksDto;
import com.ssafy.calmwave.dto.DoneWorkDatesDto;
import com.ssafy.calmwave.dto.DoneWorkDto;
import com.ssafy.calmwave.repository.DataRepository;
import com.ssafy.calmwave.repository.WorkPeriodRepository;
import com.ssafy.calmwave.repository.WorkRepository;
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
    private final WorkRepository workRepository;
    private final WorkPeriodRepository workPeriodRepository;

    public List<DoneWorkDto> findDoneWorkForToday(Long id) {
        return dataRepository.findDoneWorkForToday(id);
    }


    public List<DoneWorkDto> findDoneWorkForDateRange(Long id, String startDate, String endDate) {
        return dataRepository.findDoneWorkForDateRange(id, startDate, endDate);
    }

    public List<DoneWorkDatesDto> findDoneWorkDatesForDateRange(Long id, String startDate,
        String endDate) {
        return dataRepository.findDoneWorkDatesForDateRange(id, startDate, endDate);
    }

    public Long findDoneBeforeAimWorksForRange(Long id, String startDate, String endDate) {
        return dataRepository.findDoneBeforeAimWorksForRange(id, startDate, endDate);
    }

    public Long findDoneWorkCntForToday(Long id) {
        return dataRepository.findDoneWorkCntForToday(id);
    }
}
