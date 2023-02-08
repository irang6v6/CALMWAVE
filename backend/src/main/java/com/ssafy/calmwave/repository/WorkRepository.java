package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkRepository extends JpaRepository<Work, Long> {
    @EntityGraph(attributePaths = { "workCate" })
    List<Work> findAllByUserIdAndStatusOrderByWorkOrder(Long id, WorkStatus todo);
    void deleteAllByWorkCateId(Long cateId);

}
