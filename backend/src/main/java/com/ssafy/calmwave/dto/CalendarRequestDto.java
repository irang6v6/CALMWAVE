package com.ssafy.calmwave.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CalendarRequestDto {
    private Long workId;
    private Long cateId;
    private String cateName;
    private String title;
    private String description;
    private String status;
    private LocalDateTime dateAimed;
}
