package com.ssafy.calmwave.domain;

import javax.persistence.*;

@Entity
@Table(name = "work_category")
public class WorkCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_cate_id", nullable = false)
    private Long id;

    @Column(name = "cate_name", nullable = false, length = 20)
    private String cateName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCateName() {
        return cateName;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}