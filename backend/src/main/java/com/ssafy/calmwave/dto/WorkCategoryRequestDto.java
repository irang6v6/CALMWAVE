package com.ssafy.calmwave.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class WorkCategoryRequestDto {
    private Long id;
    private String cateName;
    private int cateColor;
    private int cateIcon;

    public WorkCategoryRequestDto(String cateName, int cateColor, int cateIcon) {
        this.cateName = cateName;
        this.cateColor = cateColor;
        this.cateIcon = cateIcon;
    }
}
