package com.ssafy.calmwave.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Optional;

@Getter @Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class WorkCategoryDto {
    private Long cateId;
    private String cateName;
    private int cateColor;
    private int cateIcon;
    private int cateOrder;
    private Optional<Long> sumBusinessHours;
    private Optional<Long> nowBusinessHours;

    public WorkCategoryDto(Long cateId, String cateName, int cateColor, int cateIcon, int cateOrder) {
        this.cateId = cateId;
        this.cateName = cateName;
        this.cateColor = cateColor;
        this.cateIcon = cateIcon;
        this.cateOrder = cateOrder;
    }
}
