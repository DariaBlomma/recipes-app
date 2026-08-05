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
@RequestMapping("/categories-personal")
@RequiredArgsConstructor
public class CategoryPersonalController {
    private final CategoryService categoryService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse createMy(
            @Valid @RequestBody CategoryCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return categoryService.createMy(userDetails.getId(), request);
    }

    @GetMapping("/{id}")
    public CategoryResponse getMyOne(
            @PathVariable("id") Long categoryId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return categoryService.getMyOne(userDetails.getId(), categoryId);
    }

    @GetMapping("/paginated")
    @ResponseStatus(HttpStatus.OK)
    public Page<CategoryPageResponse> getListPaginated(
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.DESC)
            Pageable pageable,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return categoryService.getMyListPaginated(userDetails.getId(), pageable);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryResponse> getList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return categoryService.getMyList(userDetails.getId());
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CategoryResponse update(
            @PathVariable("id") Long categoryId,
            @Valid @RequestBody CategoryUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return categoryService.updateMy(userDetails.getId(), categoryId, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSoft(
            @PathVariable("id") Long categoryId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        categoryService.deleteMySoft(userDetails.getId(), categoryId);
    }
}
