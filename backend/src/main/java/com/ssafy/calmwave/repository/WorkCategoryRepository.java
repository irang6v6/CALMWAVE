package com.ssafy.calmwave.repository;

import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import com.ssafy.calmwave.dto.WorkCategoryDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkCategoryRepository extends JpaRepository<WorkCategory, Long> {
    WorkCategory findByCateNameAndUser(String cateName, User user);

    /**
     * 유저가 사용중인 카테고리를 사용자 설정 순서로 조회하는 메소드
     * @param id
     * @param status
     * @return
     */
    @Query("select new com.ssafy.calmwave.dto.WorkCategoryDto(c.id,c.cateName,c.cateColor,c.cateIcon,c.cateOrder) from WorkCategory c join c.user u where u.id = :id and c.status =:status order by c.cateOrder")
    List<WorkCategoryDto> findByUserAndStatus(@Param("id") Long id, @Param("status") WorkCategoryStatus status);

}