package com.ssafy.calmwave.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {
    private String username;
    private String password;
}