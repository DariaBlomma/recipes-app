package com.daria.recipe.app.mapper;

import com.daria.recipe.app.dto.category.CategoryCreateRequest;
import com.daria.recipe.app.dto.category.CategoryPageResponse;
import com.daria.recipe.app.dto.category.CategoryResponse;
import com.daria.recipe.app.dto.category.CategoryUpdateRequest;
import com.daria.recipe.app.entity.Category;
import com.daria.recipe.app.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    Category toEntity(CategoryCreateRequest request);

    @Mapping(source = "recipes", target = "recipeIds")
    CategoryResponse toResponse(Category category);

    CategoryPageResponse toPageResponse(Category category);

    default List<Long> mapRecipesToIds(Collection<Recipe> recipes) {
        if (recipes == null) return List.of();
        return recipes.stream().map(Recipe::getId).toList();
    }

    @Mapping(target = "recipes", ignore = true)
    void update(CategoryUpdateRequest request, @MappingTarget Category category);
}
