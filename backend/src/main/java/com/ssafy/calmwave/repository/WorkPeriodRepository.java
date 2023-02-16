package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkPeriod;
import com.ssafy.calmwave.dto.PieChartDto;
import com.ssafy.calmwave.dto.RadarChartDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WorkPeriodRepository extends JpaRepository<WorkPeriod, Long> {
    /**
     * 특정 workId의 일한 시간의 총합
     *
     * @param workId
     * @return
     */
    @Query(value = "SELECT (SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime))) AS timediff FROM WorkPeriod t where t.work.id = :workId ")
    Optional<Long> findTimediffByWorkId(@Param("workId") Long workId);

    /**
     * 특정 user의 총 업무시간
     *
     * @param userId
     * @return
     */
    @Query(value = "SELECT (SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime))) AS timediff FROM WorkPeriod t where t.user.id = :userId and t.work.id is not null")
    Optional<Long> findSumWorkTimeByUserId(@Param("userId") Long userId);

    /**
     * 특정 user의 오늘의 총 업무시간
     *
     * @param userId
     * @return
     */
    @Query(value = "SELECT (SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime))) AS timediff FROM WorkPeriod t where t.user.id = :userId and t.work.id is not null AND t.startTime >= :startOfToday")
    Optional<Long> findTodayWorkTimeByUserId(@Param("userId") Long userId, @Param("startOfToday") LocalDateTime startOfToday);

    /**
     * 업무별 수행한 시간 비율
     *
     * @param userId
     * @return
     */
    @Query("SELECT w.title as id, w.title as label, SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime)) as value " +
            "FROM WorkPeriod t JOIN Work w on t.work.id = w.id " +
            "WHERE t.user.id = :userId and t.work.id is not null AND t.startTime >= :startOfToday " +
            "GROUP BY t.work.id")
    List<Object> findWorkDurationByUserId(@Param("userId") Long userId, @Param("startOfToday") LocalDateTime startOfToday);

    /**
     * 카테고리별 수행한 시간 비율
     *
     * @param userId
     * @return
     */
    @Query("SELECT wc.cateName, wc.cateName, SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime)) " +
            "FROM WorkPeriod t JOIN Work w ON t.work.id = w.id JOIN WorkCategory wc ON w.workCate.id = wc.id " +
            "WHERE t.user.id = :userId AND t.work.id IS NOT NULL AND t.startTime >= :startOfToday " +
            "GROUP BY w.workCate.id")
    List<Object> findWorkDurationByUserAndCategory(@Param("userId") Long userId, @Param("startOfToday") LocalDateTime startOfToday);

    /**
     * 현재 work table에 있는 work 들의 work period중 오늘 수행한 period값을 가져온다.
     *
     * @param works
     * @param startOfToday
     * @return
     */
    @Query("SELECT wp FROM WorkPeriod wp WHERE wp.work IN :works AND wp.startTime >= :startOfToday")
    List<WorkPeriod> findByWorkInAndStartTimeAfter(@Param("works") List<Work> works, @Param("startOfToday") LocalDateTime startOfToday);


    @Query("SELECT new com.ssafy.calmwave.dto.RadarChartDto(w.title, w.timeAimed, SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime))) " +
            "FROM WorkPeriod t JOIN Work w ON t.work.id = w.id " +
            "WHERE w.user.id = :userId " +
            "GROUP BY w.id")
    List<RadarChartDto> findWorkDurationByUserIdForRadarChart(@Param("userId") Long userId);

    @Query(value = "SELECT (SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime))) AS timediff FROM WorkPeriod t join Work w on t.work.id = w.id where w.workCate.id = :workCateId")
    Optional<Long> findTimediffByWorkCateId(@Param("workCateId") Long workCateId);

    @Query("SELECT (SUM(w.timeAimed)) AS timediff FROM WorkCategory t join Work w on t.id=w.workCate.id where w.workCate.id = :workCateId")
    Optional<Long> findSumOfTimeAimedByWorkCategoryId(@Param("workCateId") Long workCategoryId);


}