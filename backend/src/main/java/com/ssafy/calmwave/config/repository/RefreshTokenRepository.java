package com.ssafy.calmwave.config.repository;

import com.ssafy.calmwave.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.EntityManager;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    @Override
    void deleteById(Long aLong);

    Optional<RefreshToken> findByUsername(String username);
}
