package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkCalenderDto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface WorkRepository extends JpaRepository<Work, Long> {
    @EntityGraph(attributePaths = {"workCate"})
    List<Work> findAllByUserIdAndStatusOrderByWorkOrder(Long id, WorkStatus todo);

    void deleteAllByWorkCateId(Long cateId);


    @Query("SELECT new com.ssafy.calmwave.dto.WorkCalenderDto(w.id, w.workCate.id, wc.cateName, w.title, w.description, w.status, w.dateCreated, w.dateAimed) "
            + "FROM Work w "
            + "JOIN WorkCategory wc ON w.workCate.cateName = wc.cateName "
            + "WHERE w.user.id = :userId "
            + "AND (:searchDate BETWEEN DATE(w.dateCreated) AND COALESCE(DATE(w.dateAimed), DATE(w.dateCreated)))")
    List<WorkCalenderDto> findByUserIdAndDate(@Param("userId") Long userId, @Param("searchDate") Date searchDate);

    @Query("SELECT new com.ssafy.calmwave.dto.WorkCalenderDto(pw.id, pw.workCate.id, wc.cateName, pw.title, pw.description, pw.status, pw.dateCreated, pw.dateAimed) "
            + "FROM PastWork pw "
            + "JOIN WorkCategory wc ON pw.workCate.cateName = wc.cateName "
            + "WHERE pw.user.id = :userId "
            + "AND (:searchDate BETWEEN DATE(pw.dateCreated) AND COALESCE(DATE(pw.dateAimed), DATE(pw.dateCreated)))")
    List<WorkCalenderDto> findPastWorkByUserIdAndDate(@Param("userId") Long userId, @Param("searchDate") Date searchDate);

}


