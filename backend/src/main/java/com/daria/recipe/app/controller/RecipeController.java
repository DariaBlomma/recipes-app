package com.daria.recipe.app.controller;

import com.daria.recipe.app.dto.category.CategoryPageResponse;
import com.daria.recipe.app.dto.recipe.RecipeCreateRequest;
import com.daria.recipe.app.dto.recipe.RecipeResponse;
import com.daria.recipe.app.dto.recipe.RecipeUpdateRequest;
import com.daria.recipe.app.security.CustomUserDetails;
import com.daria.recipe.app.service.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeResponse create(
            @Valid @RequestBody RecipeCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return recipeService.createRecipe(userDetails.getId(), request);
    }

    @GetMapping("/{id}")
    public RecipeResponse getOne(@PathVariable("id") Long recipeId) {
        return recipeService.getOne(recipeId);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public Page<RecipeResponse> getList(
            @RequestParam(required = false) Long categoryId,
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.DESC)
            Pageable pageable,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return recipeService.getList(userDetails.getId(), categoryId, pageable);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RecipeResponse update(
            @PathVariable("id") Long recipeId,
            @Valid @RequestBody RecipeUpdateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return recipeService.putRecipe(userDetails.getId(), recipeId, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSoft(
            @PathVariable("id") Long recipeId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
       recipeService.deleteSoft(userDetails.getId(), recipeId);
    }
}
