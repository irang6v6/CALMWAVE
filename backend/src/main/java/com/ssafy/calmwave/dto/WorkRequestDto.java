package com.ssafy.calmwave.dto;

import com.ssafy.calmwave.domain.WorkStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class WorkRequestDto {

    private Long workId;
    private String title;
    private String description;
    private LocalDateTime dateAimed;
    private Long workCateId;
    private WorkStatus workStatus;

    public WorkRequestDto(Long workId, String title, String description, LocalDateTime dateAimed, Long workCateId) {
        this.workId = workId;
        this.title = title;
        this.description = description;
        this.dateAimed = dateAimed;
        this.workCateId = workCateId;
    }

    public WorkRequestDto(String title, String description, LocalDateTime dateAimed, Long workCateId) {
        this.title = title;
        this.description = description;
        this.dateAimed = dateAimed;
        this.workCateId = workCateId;
    }
}
