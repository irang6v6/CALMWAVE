package com.ssafy.calmwave.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Setter;

@Entity
@Table(name = "expression")
@NoArgsConstructor
@Getter @Setter
public class Expression {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expression_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "work_id", nullable = false)
    private Work work;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "past_work_id")
    private PastWork pastWork;

    @Column(name = "date_created", nullable = false)
    private Instant dateCreated;

    @Column(name = "neutral")
    private Double neutral;

    @Column(name = "happy")
    private Double happy;

    @Column(name = "sad")
    private Double sad;

    @Column(name = "angry")
    private Double angry;

    @Column(name = "fearful")
    private Double fearful;

    @Column(name = "disgusted")
    private Double disgusted;

    @Column(name = "surprised")
    private Double surprised;
}