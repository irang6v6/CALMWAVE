package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.PastWork;
import com.ssafy.calmwave.dto.WorkDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface PastWorkRepository extends JpaRepository<PastWork,Long> {
    @Query("SELECT new com.ssafy.calmwave.dto.WorkDto(w.id, w.workCate.id, wc.cateName, w.title, w.description, w.status, w.dateCreated, w.dateAimed) " +
            "FROM PastWork w " +
            "JOIN WorkCategory wc ON w.workCate = wc " +
            "WHERE :date BETWEEN DATE(w.dateCreated) AND COALESCE(DATE(w.dateAimed), DATE(w.dateCreated)) " +
            "AND w.user.id = :userId")
    List<WorkDto> findByUserIdAndBetweenDateCreatedAndDateAimed(@Param("userId") Long userId, @Param("date") Date date);
}
