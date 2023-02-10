package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkCalenderDto;
import com.ssafy.calmwave.dto.WorkDto;
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

    @Query("SELECT new com.ssafy.calmwave.dto.WorkDto(w.id, w.workCate.id, wc.cateName, w.title, w.description, w.status, w.dateCreated, w.dateAimed) " +
            "FROM Work w " +
            "JOIN WorkCategory wc ON w.workCate = wc " +
            "WHERE :date BETWEEN DATE(w.dateCreated) AND COALESCE(DATE(w.dateAimed), DATE(w.dateCreated)) " +
            "AND w.user.id = :userId")
    List<WorkDto> findByUserIdAndBetweenDateCreatedAndDateAimed(@Param("userId") Long userId, @Param("date") Date date);
}




