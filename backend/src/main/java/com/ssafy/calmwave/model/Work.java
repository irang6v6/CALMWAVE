package com.ssafy.calmwave.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Work {

    @Id
    @GeneratedValue
    @Column(name = "work_id")
    private Long id;

    String title;
    String description;

    @Enumerated(EnumType.STRING)
    private WorkStatus status;

}
