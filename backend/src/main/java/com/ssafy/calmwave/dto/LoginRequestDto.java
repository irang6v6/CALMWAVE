package com.ssafy.calmwave.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String password;
}