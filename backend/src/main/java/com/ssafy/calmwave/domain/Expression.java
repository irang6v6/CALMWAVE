package com.ssafy.calmwave.domain;

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

@Entity
@Table(name = "expression")
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Work getWork() {
        return work;
    }

    public void setWork(Work work) {
        this.work = work;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Double getNeutral() {
        return neutral;
    }

    public void setNeutral(Double neutral) {
        this.neutral = neutral;
    }

    public Double getHappy() {
        return happy;
    }

    public void setHappy(Double happy) {
        this.happy = happy;
    }

    public Double getSad() {
        return sad;
    }

    public void setSad(Double sad) {
        this.sad = sad;
    }

    public Double getAngry() {
        return angry;
    }

    public void setAngry(Double angry) {
        this.angry = angry;
    }

    public Double getFearful() {
        return fearful;
    }

    public void setFearful(Double fearful) {
        this.fearful = fearful;
    }

    public Double getDisgusted() {
        return disgusted;
    }

    public void setDisgusted(Double disgusted) {
        this.disgusted = disgusted;
    }

    public Double getSurprised() {
        return surprised;
    }

    public void setSurprised(Double surprised) {
        this.surprised = surprised;
    }

}