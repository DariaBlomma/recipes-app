package com.daria.recipe.app.mapper;

import com.daria.recipe.app.dto.recipe.RecipeCreateRequest;
import com.daria.recipe.app.dto.recipe.RecipeResponse;
import com.daria.recipe.app.dto.recipe.RecipeUpdateRequest;
import com.daria.recipe.app.entity.Category;
import com.daria.recipe.app.entity.Recipe;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RecipeMapper {
    @Mapping(target = "category", ignore = true)
    Recipe toEntity(RecipeCreateRequest request);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "personalCategories", target = "personalCategoryIds")
    RecipeResponse toResponse(Recipe recipe);

    default Long categoryToId(Category category) {
        return category.getId();
    }

    @Mapping(target = "category", ignore = true)
    void update(RecipeUpdateRequest request, @MappingTarget Recipe recipe);
}
