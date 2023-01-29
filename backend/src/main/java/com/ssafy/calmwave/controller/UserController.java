package com.ssafy.calmwave.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class UserController {

    @PostMapping("login")
    public void login(@AuthenticationPrincipal Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("hihi"+authentication.getName());
    }
}
