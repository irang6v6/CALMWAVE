package com.ssafy.calmwave.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.calmwave.domain.WorkStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@AllArgsConstructor
public class WorkResponseDto {
    private Long id;
    private String title;
    private String description;
    private WorkStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime dateCreated;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime dateAimed;
    private int workOrder;
    private Optional<Long> totalTime;
    private WorkCategoryDto workCate;
}
