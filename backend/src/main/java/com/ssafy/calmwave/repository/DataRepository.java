package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.Work;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataRepository extends JpaRepository<Work, Long>, DataCustomRepository {


}
