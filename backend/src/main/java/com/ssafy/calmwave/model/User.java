package com.ssafy.calmwave.model;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.data.annotation.CreatedDate;

@Entity
@ToString
@NoArgsConstructor
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "roles", nullable = false, length = 10)
    private String role;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "nickname", nullable = false, length = 20)
    private String nickname;

    @Column(name = "stretching_interval_min", nullable = false)
    private Integer stretchingIntervalMin;

    @CreationTimestamp
    @Column(name = "date_registered")
    private Instant dateRegistered;

    @Column(name = "deleted", nullable = false)
    private Byte deleted;

    @Column(name = "provider", length = 50)
    private String provider;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Integer getStretchingIntervalMin() {
        return stretchingIntervalMin;
    }

    public void setStretchingIntervalMin(Integer stretchingIntervalMin) {
        this.stretchingIntervalMin = stretchingIntervalMin;
    }

    public Instant getDateRegistered() {
        return dateRegistered;
    }

    public void setDateRegistered(Instant dateRegistered) {
        this.dateRegistered = dateRegistered;
    }

    public Byte getDeleted() {
        return deleted;
    }

    public void setDeleted(Byte deleted) {
        this.deleted = deleted;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
    @Builder
    public User(String email, String nickname, int stretchingIntervalMin, Byte quit, String password, String role, String provider) {
        this.username = email;
        this.nickname = nickname;
        this.stretchingIntervalMin = stretchingIntervalMin;
        this.deleted = quit;
        this.password = password;
        this.role = role;
        this.provider = provider;
    }


    public List<String> getRoleList() {
        if (this.role.length() > 0) {
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }
}
