package com.ssafy.calmwave.domain;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "work")
public class Work {
    @Id
    @Column(name = "work_id", nullable = false)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private WorkStatus status;

    @Column(name = "date_created")
    private Instant dateCreated;

    @Column(name = "date_aimed")
    private Instant dateAimed;

    @Column(name = "date_finished")
    private Instant dateFinished;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_cate_id")
    private WorkCategory workCate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public WorkStatus getStatus() {
        return status;
    }

    public void setStatus(WorkStatus status) {
        this.status = status;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateAimed() {
        return dateAimed;
    }

    public void setDateAimed(Instant dateAimed) {
        this.dateAimed = dateAimed;
    }

    public Instant getDateFinished() {
        return dateFinished;
    }

    public void setDateFinished(Instant dateFinished) {
        this.dateFinished = dateFinished;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public WorkCategory getWorkCate() {
        return workCate;
    }

    public void setWorkCate(WorkCategory workCate) {
        this.workCate = workCate;
    }

}