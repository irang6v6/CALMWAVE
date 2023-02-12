package com.ssafy.calmwave.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "posture")
@NoArgsConstructor
@Getter
@Setter
public class Posture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "posture_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Enumerated(EnumType.STRING)
    @Column(name = "cName", nullable = false)
    private PostureCName cName;


    @CreationTimestamp
    @Column(name = "date_created", nullable = false)
    private LocalDateTime dateCreated;

    public Posture(User user, PostureCName cName) {
        this.user = user;
        this.cName = cName;
    }
}