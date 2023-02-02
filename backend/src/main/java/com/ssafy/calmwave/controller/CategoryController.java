package com.ssafy.calmwave.controller;

import com.ssafy.calmwave.config.jwt.JwtUtil;
import com.ssafy.calmwave.domain.WorkCategory;
import com.ssafy.calmwave.domain.WorkCategoryStatus;
import com.ssafy.calmwave.domain.User;
import com.ssafy.calmwave.dto.WorkCategoryRequestDto;
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
@RequestMapping("api/v1/category")
@Api(tags = "카테고리 API")
public class CategoryController {

    private final JwtUtil jwtUtil;
    private final CategoryService categoryService;
    private final WorkCategoryRepository workCategoryRepository;

    /**
     * @param token
     * @param categoryRequestDto
     * @return
     */
    @PostMapping("create")
    @ApiOperation(value = "카테고리 추가", notes = "result:ok")
    public ResponseEntity<?> create(@RequestHeader(value = "AccessToken") String token, @RequestBody WorkCategoryRequestDto categoryRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = jwtUtil.getUser(token);
        WorkCategory byName = categoryService.findByName(categoryRequestDto.getCateName(), user);

        if (byName == null) { //처음 만드는 카테고리일때
            WorkCategory cate = WorkCategory.builder()
                    .cateName(categoryRequestDto.getCateName())
                    .cateColor(categoryRequestDto.getCateColor())
                    .cateIcon(categoryRequestDto.getCateIcon())
                    .workCategoryStatus(WorkCategoryStatus.VALID)
                    .user(user)
                    .build();
            WorkCategory save = categoryService.save(cate);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else if (byName != null && byName.getStatus() == WorkCategoryStatus.DELETED) {//예전에 만들었던 카테고리일때
            byName.setStatus(WorkCategoryStatus.VALID);
            categoryService.save(byName);
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            resultMap.put("result", "이미 사용중인 카테고리입니다!");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     *
     * @param token
     * @return List<WorkCategory>
     */
    @GetMapping("list")
    @ApiOperation(value = "유저별 카테고리 리스트 조회", notes = "",response = WorkCategory.class)
    public ResponseEntity<?> getCategoryList(@RequestHeader(value = "AccessToken") String token) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        User user = jwtUtil.getUser(token);
        List<WorkCategory> workCategories = categoryService.findByUserAndStatus(user);
        return ResponseEntity.ok().body(workCategories);
    }

    /**
     * @param cateId
     * @return ok
     */
    @GetMapping("delete/{cateid}")
    @ApiOperation(value = "카테고리 삭제", notes = "result:ok")
    public ResponseEntity<?> deleteCategory(@PathVariable("cateid") Long cateId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        categoryService.deleteById(cateId);
        resultMap.put("result", "ok");
        status = HttpStatus.ACCEPTED;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    /**
     * @param workCategoryRequestDto
     * @return ok
     */
    @PostMapping("update/{cateid}")
    @ApiOperation(value = "카테고리 수정", notes = "result:ok")
    public ResponseEntity<?> join(@RequestBody WorkCategoryRequestDto workCategoryRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status;
        Optional<WorkCategory> byId = categoryService.findById(workCategoryRequestDto.getId());
        WorkCategory workCategory = byId.get();
        workCategory.setCateColor(workCategoryRequestDto.getCateColor());
        workCategory.setCateIcon(workCategoryRequestDto.getCateIcon());
        workCategory.setCateName(workCategoryRequestDto.getCateName());
        WorkCategory save = categoryService.save(workCategory);
        if (save != null) {
            //데이터 요청 성공
            resultMap.put("result", "ok");
            status = HttpStatus.ACCEPTED;
        } else {
            //요청 실패
            resultMap.put("result", "err");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }


}
