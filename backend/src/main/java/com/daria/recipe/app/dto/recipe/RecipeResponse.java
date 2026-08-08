package com.daria.recipe.app.dto.recipe;

import lombok.Data;
import java.util.List;

@Data
public class RecipeResponse {
    private Long id;
    private String name;
    private Long categoryId;
    private List<Long> personalCategoryIds;
    private Long userId;
    private String externalLink;
    private String description;
    private String shortDescription;
}
