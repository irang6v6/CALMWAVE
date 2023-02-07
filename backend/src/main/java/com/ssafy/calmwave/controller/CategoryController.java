package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.dto.WorkCategoryDto;
import com.ssafy.calmwave.repository.WorkCategoryRepository;
import com.ssafy.calmwave.service.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("v1/category")
@Api(tags = "카테고리 API")
public class CategoryController {

    private final JwtUtil jwtUtil;
    private final CategoryService categoryService;
    private final WorkCategoryRepository workCategoryRepository;

    /**
     * 카테고리 생성
     * @param token
     * @param categoryRequestDto
     * @return
     */
    @PostMapping("create")
    @ApiOperation(value = "카테고리 추가", notes = "result:ok")
    public ResponseEntity<?> create(@RequestHeader(value = "AccessToken") String token, @RequestBody WorkCategoryDto categoryRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        User user = jwtUtil.getUser(token);
        WorkCategory workCategory = categoryService.findByName(categoryRequestDto.getCateName(), user);
        HttpStatus status;
        if (workCategory == null) { //처음 만드는 카테고리일때
            WorkCategory cate = WorkCategory.builder()
                    .cateName(categoryRequestDto.getCateName())
                    .cateColor(categoryRequestDto.getCateColor())
                    .cateIcon(categoryRequestDto.getCateIcon())
                    .workCategoryStatus(WorkCategoryStatus.VALID)
                    .user(user)
                    .build();
            workCategoryRepository.save(cate);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else if (workCategory != null && workCategory.getStatus() == WorkCategoryStatus.DELETED) {//예전에 만들었던 카테고리일때
            workCategory.setStatus(WorkCategoryStatus.VALID);
            workCategoryRepository.save(workCategory);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "이미 사용중인 카테고리입니다!");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * User별 Category를 order순으로 조회
     * @param token
     * @return List<WorkCategoryDto>
     */
    @GetMapping("list")
    @ApiOperation(value = "유저별 카테고리 리스트 order순 조회", notes = "", response = WorkCategoryDto.class)
    public ResponseEntity<?> getCategoryList(@RequestHeader(value = "AccessToken") String token) {
        System.out.println(token);
        User user = jwtUtil.getUser(token);
        List<WorkCategoryDto> workCategories = categoryService.findByUserAndStatus(user);
        return ResponseEntity.ok().body(workCategories);
    }

    /**
     * 카테고리 삭제
     * @param
     * @return "ok"
     */
    @PostMapping("delete")
    @ApiOperation(value = "카테고리 삭제", notes = "result:ok")
        public ResponseEntity<?> deleteCategory(@RequestBody Map<String, Long> body, @RequestHeader(value = "AccessToken") String token) {
        long categoryId = body.get("cateId");
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Optional<WorkCategory> byId = categoryService.findById(categoryId);
        //카테고리의 주인이 맞는지 확인
        if (byId.isPresent() && categoryService.checkValid(byId,token)) {
            categoryService.deleteById(categoryId);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "해당 카테고리를 삭제할 권한이 없습니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * category 순서 변경
     * @param cateIds
     * @return "ok"
     */
    @PostMapping("/order")
    public ResponseEntity<?> updateComponentOrder(@RequestBody List<Long> cateIds) {
        List<WorkCategory> workCategories = workCategoryRepository.findAllById(cateIds);
        for (int i = 0; i < workCategories.size(); i++) {
            workCategories.get(i).setCateOrder(i);
        }
        workCategoryRepository.saveAll(workCategories);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", "ok");
        HttpStatus status = HttpStatus.ACCEPTED;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * 카테고리 수정
     * @param workCategoryDto
     * @return "ok"
     */
    @PostMapping("update")
    @ApiOperation(value = "카테고리 수정", notes = "result:ok")
    public ResponseEntity<?> join(@RequestHeader(value = "AccessToken") String token, @RequestBody WorkCategoryDto workCategoryDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Optional<WorkCategory> byId = categoryService.findById(workCategoryDto.getCateId());
        //카테고리의 주인이 맞는지 확인
        if (byId.isPresent() && categoryService.checkValid(byId,token)) {
            WorkCategory workCategory = byId.get();
            workCategory.setCateColor(workCategoryDto.getCateColor());
            workCategory.setCateIcon(workCategoryDto.getCateIcon());
            workCategory.setCateName(workCategoryDto.getCateName());
            categoryService.save(workCategory);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "해당 카테고리를 수정할 권한이 없습니다.");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}
