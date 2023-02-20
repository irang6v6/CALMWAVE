package com.ssafy.calmwave.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class DoneWorkDatesDto {

    private LocalDateTime dateFinished;

    @QueryProjection
    public DoneWorkDatesDto(LocalDateTime dateFinished) {
        this.dateFinished = dateFinished;
    }
}
