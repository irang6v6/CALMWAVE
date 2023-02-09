package com.ssafy.calmwave.dto;

import com.ssafy.calmwave.domain.WorkStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import reactor.util.annotation.Nullable;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@RequiredArgsConstructor
public class WorkRequestDto {

    private Long workId;
    private String title;
    private String description;
    private Optional<LocalDateTime> dateAimed;
    private Optional<Long> timeAimed;
    private Long workCateId;
    private WorkStatus workStatus;

    /**
     * update할때 사용
     *
     * @param workId
     * @param title
     * @param description
     * @param dateAimed
     * @param timeAimed
     * @param workCateId
     */
    public WorkRequestDto(Long workId, String title, String description, Optional<LocalDateTime> dateAimed, Optional<Long> timeAimed, Long workCateId) {
        this.workId = workId;
        this.title = title;
        this.description = description;
        this.dateAimed = dateAimed;
        this.timeAimed = timeAimed;
        this.workCateId = workCateId;
    }
}
