package com.ssafy.calmwave.model;

import java.time.LocalDate;
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
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;
    private String username;
    private String nickname;
    @Column(name = "stretching_interval_min")
    private int stretchingIntervalMin;
    private int quit;
    private String password;
    private String role;
    private String provider;

    @Builder
    public User(String email, String nickname, int stretchingIntervalMin, int quit, String password, String role, String provider) {
        this.username = email;
        this.nickname = nickname;
        this.stretchingIntervalMin = stretchingIntervalMin;
        this.quit = quit;
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
