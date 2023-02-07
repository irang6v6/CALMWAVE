package com.ssafy.calmwave.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class WorkPeriodRequestDto {
    private Long workId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
