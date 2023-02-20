package com.ssafy.calmwave.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.net.PasswordAuthentication;
import javax.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.parameters.P;

@Entity
@Table(name = "work_period")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class WorkPeriod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_period_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "work_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Work work;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "past_work_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PastWork pastWork;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Builder
    public WorkPeriod(Work work, User user, LocalDateTime startTime, LocalDateTime endTime) {
        this.work = work;
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}