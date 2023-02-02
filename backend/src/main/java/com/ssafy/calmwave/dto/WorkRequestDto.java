package com.ssafy.calmwave.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class WorkRequestDto {

    private String title;
    private String description;
    private LocalDateTime dateAimed;
    private Long userId;
    private Long workCateId;

    public WorkRequestDto(String title, String description, LocalDateTime dateAimed, Long userId) {
        this.title = title;
        this.description = description;
        this.dateAimed = dateAimed;
        this.userId = userId;
    }
}
