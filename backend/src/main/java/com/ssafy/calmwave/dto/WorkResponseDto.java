package com.ssafy.calmwave.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.calmwave.domain.WorkStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

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
    private Long totalTime;
    private Long cateId;

    @Builder
    public WorkResponseDto(Long id, String title, String description, WorkStatus status, LocalDateTime dateCreated, LocalDateTime dateAimed, int workOrder, Long totalTime) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.dateCreated = dateCreated;
        this.dateAimed = dateAimed;
        this.workOrder = workOrder;
        this.totalTime = totalTime;
        this.cateId = cateId;
    }
}
