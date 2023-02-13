package com.ssafy.calmwave.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Optional;

@Data
public class DoneTaskDto {

    private Long id;
    private String title;
    private String description;
    private WorkStatus status;
    private LocalDateTime dateCreated;
    private LocalDateTime dateFinished;
    private LocalDateTime dateAimed;
    private Long timeAimed;
    private int workOrder;
    private Long totalTime;
    private Long cateId;
    private String cateName;

    @QueryProjection
    public DoneTaskDto(Long id, String title, String description, WorkStatus status,
        LocalDateTime dateCreated, LocalDateTime dateFinished, LocalDateTime dateAimed,
        Long timeAimed,
        int workOrder, Long totalTime, Long cateId, String cateName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.dateCreated = dateCreated;
        this.dateFinished = dateFinished;
        this.dateAimed = dateAimed;
        this.timeAimed = timeAimed;
        this.workOrder = workOrder;
        this.totalTime = totalTime;
        this.cateId = cateId;
        this.cateName = cateName;
    }
}
