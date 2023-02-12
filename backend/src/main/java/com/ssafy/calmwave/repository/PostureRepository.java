package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Posture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostureRepository extends JpaRepository<Posture, Long> {
}