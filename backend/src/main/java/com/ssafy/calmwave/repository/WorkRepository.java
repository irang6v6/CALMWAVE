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
import java.util.Optional;

public interface WorkRepository extends JpaRepository<Work, Long> {
    @EntityGraph(attributePaths = {"workCate"})
    List<Work> findAllByUserIdAndStatusOrderByWorkOrder(Long id, WorkStatus todo);

    List<Work> findAllByUserId(Long id);

    void deleteAllByWorkCateId(Long cateId);

    /**
     * Work Table에 있는 TODO
     * @param userId
     * @param searchDate
     * @return
     */
    @Query("SELECT DISTINCT new com.ssafy.calmwave.dto.WorkCalenderDto(w.id, w.workCate.id, wc.cateName, w.title, w.description, w.status, w.dateCreated, w.dateAimed, w.timeAimed) "
            + "FROM Work w "
            + "JOIN WorkCategory wc ON w.workCate.cateName = wc.cateName "
            + "WHERE w.user.id = :userId "
            + "AND (:searchDate BETWEEN DATE(w.dateCreated) AND COALESCE(DATE(w.dateAimed), DATE(w.dateCreated)))")
    List<WorkCalenderDto> findByUserIdAndDate(@Param("userId") Long userId, @Param("searchDate") Date searchDate);

    /**
     * Pastwork table에 있는 DONE
     * @param userId
     * @param searchDate
     * @return
     */
    @Query("SELECT DISTINCT new com.ssafy.calmwave.dto.WorkCalenderDto(pw.id, pw.workCate.id, wc.cateName, pw.title, pw.description, pw.status, pw.dateCreated, pw.dateAimed, pw.timeAimed) "
            + "FROM PastWork pw "
            + "JOIN WorkCategory wc ON pw.workCate.cateName = wc.cateName "
            + "WHERE pw.user.id = :userId "
            + "AND (:searchDate BETWEEN DATE(pw.dateCreated) AND COALESCE(DATE(pw.dateAimed), DATE(pw.dateCreated)))")
    List<WorkCalenderDto> findPastWorkByUserIdAndDate(@Param("userId") Long userId, @Param("searchDate") Date searchDate);

    @Query("SELECT SUM(w.timeAimed) FROM Work w WHERE w.user.id = :userId")
    Long findTotalTimeAimedByUserId(@Param("userId") Long userId);
}




