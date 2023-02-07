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

    public WorkRequestDto(Long id,WorkStatus workStatus) {
        this.workId = id;
        this.workStatus = workStatus;
    }

    public WorkRequestDto(String title, String description, LocalDateTime dateAimed, Long workCateId) {
        this.title = title;
        this.description = description;
        this.dateAimed = dateAimed;
        this.workCateId = workCateId;
    }
}
