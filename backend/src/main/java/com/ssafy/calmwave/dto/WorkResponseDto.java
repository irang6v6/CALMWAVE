package com.ssafy.calmwave.dto;

import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkStatus;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class WorkResponseDto {
    private Long id;
    private String title;
    private String description;
    private WorkStatus status;
    private LocalDateTime dateCreated;
    private LocalDateTime dateAimed;
    private WorkCategory workCate;

    public WorkResponseDto(Long id, String title, String description, WorkStatus status, LocalDateTime dateCreated, LocalDateTime dateAimed, WorkCategory workCate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.dateCreated = dateCreated;
        this.dateAimed = dateAimed;
        this.workCate = workCate;
    }
}
