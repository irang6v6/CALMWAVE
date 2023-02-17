package com.ssafy.calmwave.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private Long userId;
    private String username;
    private String nickname;
    private Integer stretchingIntervalMin;
    private Instant dateRegistered;

    public UserInfoDto(Long userId, String nickname, Integer stretchingIntervalMin) {
        this.userId = userId;
        this.nickname = nickname;
        this.stretchingIntervalMin = stretchingIntervalMin;
    }
}
