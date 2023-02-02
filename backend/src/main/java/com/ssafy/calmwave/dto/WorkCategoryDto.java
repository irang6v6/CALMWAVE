package com.ssafy.calmwave.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class WorkCategoryDto {
    private Long cateId;
    private String cateName;
    private int cateColor;
    private int cateIcon;
    private int cateOrder;

    public WorkCategoryDto(String cateName, int cateColor, int cateIcon) {
        this.cateName = cateName;
        this.cateColor = cateColor;
        this.cateIcon = cateIcon;
    }

    public WorkCategoryDto(String cateName, int cateColor, int cateIcon, int cateOrder) {
        this.cateName = cateName;
        this.cateColor = cateColor;
        this.cateIcon = cateIcon;
        this.cateOrder = cateOrder;
    }
}
