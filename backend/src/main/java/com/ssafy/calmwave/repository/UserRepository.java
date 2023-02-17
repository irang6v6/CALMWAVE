package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username); //email

    public Optional<User> findById(Long userId);

}
