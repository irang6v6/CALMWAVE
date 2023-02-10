package com.ssafy.calmwave.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.calmwave.domain.WorkStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
public class WorkCalenderDto {
    private Long workId;
    private Long workCateId;
    private String title;
    private String description;
    private WorkStatus status;
    private LocalDateTime dateCreated;
    private LocalDateTime dateAimed;
}
