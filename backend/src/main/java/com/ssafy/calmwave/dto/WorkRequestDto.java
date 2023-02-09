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
    private Long timeAimed;
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
    public WorkRequestDto(Long workId, String title, String description, LocalDateTime dateAimed, Long timeAimed, Long workCateId) {
        this.workId = workId;
        this.title = title;
        this.description = description;
        this.dateAimed = dateAimed;
        this.timeAimed = timeAimed;
        this.workCateId = workCateId;
    }

    /**
     * create할때 사용
     *
     * @param title
     * @param description
     * @param dateAimed
     * @param timeAimed
     * @param workCateId
     */
    public WorkRequestDto(String title, String description, LocalDateTime dateAimed, Long timeAimed, Long workCateId) {
        this.title = title;
        this.description = description;
        this.dateAimed = dateAimed;
        this.timeAimed = timeAimed;
        this.workCateId = workCateId;
    }
}
