package com.ssafy.calmwave.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String refreshToken;
    @Column(name = "email")
    private String username;

    public RefreshToken(String token, String email) {
        this.refreshToken = token;
        this.username = email;
    }

    public RefreshToken updateToken(String token) {
        this.refreshToken = token;
        return this;
    }
}
