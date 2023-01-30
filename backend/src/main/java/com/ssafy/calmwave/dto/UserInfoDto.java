package com.ssafy.calmwave.dto;

import com.ssafy.calmwave.model.User;
import java.time.Instant;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private Long id;
    private String username;
    private String nickname;
    private Integer stretchingIntervalMin;
    private Instant dateRegistered;

    public UserInfoDto(Long id, String nickname, Integer stretchingIntervalMin) {
        this.id = id;
        this.nickname = nickname;
        this.stretchingIntervalMin = stretchingIntervalMin;
    }
}
