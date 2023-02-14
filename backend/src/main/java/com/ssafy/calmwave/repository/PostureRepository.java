package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Posture;
import com.ssafy.calmwave.domain.PostureCName;
import com.ssafy.calmwave.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface PostureRepository extends JpaRepository<Posture, Long> {

    @Query("SELECT COUNT(p) FROM Posture p WHERE p.user = :user AND p.dateCreated >= :dateCreated AND p.cName = :cName")
    Long countByUserAndDateCreatedAfterAndCName(@Param("user") User user, @Param("dateCreated") LocalDateTime dateCreated, @Param("cName") PostureCName cName);
}