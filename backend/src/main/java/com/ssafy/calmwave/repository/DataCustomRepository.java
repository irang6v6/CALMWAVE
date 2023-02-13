package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.dto.DoneWorkDto;
import java.util.List;

public interface DataCustomRepository {

    List<DoneWorkDto> findDoneWorkForToday(Long id);

    List<DoneWorkDto> findDoneWorkForDateRange(Long id, String startDate, String endDate);
}
