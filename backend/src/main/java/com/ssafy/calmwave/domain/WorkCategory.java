package com.ssafy.calmwave.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "work_category")
@NoArgsConstructor
@AllArgsConstructor
public class WorkCategory {

    public WorkCategory(Long id, String cateName, int cateColor, int cateIcon) {
        this.id = id;
        this.cateName = cateName;
        this.cateColor = cateColor;
        this.cateIcon = cateIcon;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_cate_id")
    private Long id;

    @Column(name = "cate_name", nullable = false, length = 20)
    private String cateName;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int cateColor;

    private int cateIcon;

    private int cateOrder;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_cate_status")
    private WorkCategoryStatus status;


    @Builder
    public WorkCategory(String cateName, User user, int cateColor, int cateIcon,WorkCategoryStatus workCategoryStatus) {
        this.cateName = cateName;
        this.user = user;
        this.cateColor = cateColor;
        this.cateIcon = cateIcon;
        this.status = workCategoryStatus;
    }

    public int getCateOrder() {
        return cateOrder;
    }

    public void setCateOrder(int cateOrder) {
        this.cateOrder = cateOrder;
    }

    public int getCateColor() {
        return cateColor;
    }

    public void setCateColor(int cateColor) {
        this.cateColor = cateColor;
    }

    public int getCateIcon() {
        return cateIcon;
    }

    public void setCateIcon(int cateIcon) {
        this.cateIcon = cateIcon;
    }

    public WorkCategoryStatus getStatus() {
        return status;
    }

    public void setStatus(WorkCategoryStatus status) {
        this.status = status;
    }

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