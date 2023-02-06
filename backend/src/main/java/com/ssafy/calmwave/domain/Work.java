package com.ssafy.calmwave.domain;

import lombok.Builder;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import reactor.util.annotation.Nullable;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "work")
@NoArgsConstructor
public class Work {
    @Id
    @Column(name = "work_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private WorkStatus status;

    @CreationTimestamp
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Column(name = "date_aimed")
    private LocalDateTime dateAimed;

    @Column(name = "date_finished")
    private LocalDateTime dateFinished;

    @Column(name = "work_order")
    private int workOrder;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_cate_id",nullable = false)
    private WorkCategory workCate;

    public int getWorkOrder() {
        return workOrder;
    }

    public void setWorkOrder(int workOrder) {
        this.workOrder = workOrder;
    }

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

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDateTime getDateAimed() {
        return dateAimed;
    }

    public void setDateAimed(LocalDateTime dateAimed) {
        this.dateAimed = dateAimed;
    }

    public LocalDateTime getDateFinished() {
        return dateFinished;
    }

    public void setDateFinished(LocalDateTime dateFinished) {
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

    @Builder
    public Work(String title, String description, WorkStatus status, LocalDateTime dateAimed, User user, WorkCategory workCate) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dateAimed = dateAimed;
        this.user = user;
        this.workCate = workCate;
    }
}