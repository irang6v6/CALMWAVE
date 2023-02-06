package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Work;
import com.ssafy.calmwave.domain.WorkStatus;
import com.ssafy.calmwave.dto.WorkResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkRepository extends JpaRepository<Work,Long> {
     List<Work> findAllByUserIdAndStatusOrderByWorkOrder(Long id, WorkStatus todo);

}
