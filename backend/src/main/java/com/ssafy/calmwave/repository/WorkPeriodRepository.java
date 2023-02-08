package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.WorkPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface WorkPeriodRepository extends JpaRepository<WorkPeriod, Long> {
    @Query(value = "SELECT (SUM(TIME_TO_SEC(t.endTime) - TIME_TO_SEC(t.startTime))) AS timediff FROM WorkPeriod t where t.work.id = :workId")
    Optional<Long> findTimediffByWorkId(@Param("workId") Long workId);
}