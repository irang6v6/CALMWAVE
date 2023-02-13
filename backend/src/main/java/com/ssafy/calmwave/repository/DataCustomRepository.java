package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.dto.DoneTaskDto;

import java.util.List;

public interface DataCustomRepository {

    List<DoneTaskDto> findDoneTaskForToday(Long id);

    List<DoneTaskDto> findDoneTaskForDateRange(Long id, String startDate, String endDate);
}
