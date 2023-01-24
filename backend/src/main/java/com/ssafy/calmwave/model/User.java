package com.ssafy.calmwave.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;
    @Column(name = "email")
    private String username;
    private String nickname;
    @Column(name = "stretching_interval_min")
    private int stretchingIntervalMin;
    @CreationTimestamp
    @Column(name = "date_registered")
    private LocalDate dateRegistered;
    private int quit;
    private String password;
    private String role;

    public List<String> getRoleList() {
        if (this.role.length() > 0) {
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }
}
