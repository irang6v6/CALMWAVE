package com.ssafy.calmwave.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class DoneBeforeAimWorksDto {

    private Long totalWorkCnt;

    private Long doneBeforeAimWorkCnt;

    @QueryProjection
    public DoneBeforeAimWorksDto(Long totalWorkCnt, Long doneBeforeAimWorkCnt) {
        this.totalWorkCnt = totalWorkCnt;
        this.doneBeforeAimWorkCnt = doneBeforeAimWorkCnt;
    }
}
