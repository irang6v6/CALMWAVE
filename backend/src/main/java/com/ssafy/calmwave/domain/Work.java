package com.ssafy.calmwave.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import reactor.util.annotation.Nullable;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "work_cate_id", nullable = false)
    private WorkCategory workCate;


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