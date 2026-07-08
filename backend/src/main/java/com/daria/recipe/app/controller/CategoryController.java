package com.daria.recipe.app.controller;

import com.daria.recipe.app.dto.category.CategoryCreateRequest;
import com.daria.recipe.app.dto.category.CategoryPageResponse;
import com.daria.recipe.app.dto.category.CategoryResponse;
import com.daria.recipe.app.dto.category.CategoryUpdateRequest;
import com.daria.recipe.app.security.CustomUserDetails;
import com.daria.recipe.app.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse create(
            @Valid @RequestBody CategoryCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return categoryService.create(userDetails.getId(), request);
    }

    @GetMapping("/{id}")
    public CategoryResponse getOne(@PathVariable("id") Long categoryId) {
        return categoryService.getOne(categoryId);
    }

    @GetMapping("/paginated")
    @ResponseStatus(HttpStatus.OK)
    public Page<CategoryPageResponse> getListPaginated(
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.DESC)
            Pageable pageable,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return categoryService.getListPaginated(userDetails.getId(), pageable);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryResponse> getList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return categoryService.getList(userDetails.getId());
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CategoryResponse update(
            @PathVariable("id") Long categoryId,
            @Valid @RequestBody CategoryUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return categoryService.update(userDetails.getId(), categoryId, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSoft(
            @PathVariable("id") Long categoryId,
            Long categoryIdForMove,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        categoryService.deleteSoft(userDetails.getId(), categoryId, categoryIdForMove);
    }
}
