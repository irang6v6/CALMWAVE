package com.ssafy.calmwave.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import reactor.util.annotation.Nullable;

import java.util.Optional;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class RadarChartDto {
    private String title;
    @Nullable
    private Long aimedTime;
    @Nullable
    private Long totalTime;
}
