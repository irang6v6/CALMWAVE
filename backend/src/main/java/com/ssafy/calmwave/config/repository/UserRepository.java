package com.ssafy.calmwave.config.repository;

import com.ssafy.calmwave.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUsername(String username); //email

}
