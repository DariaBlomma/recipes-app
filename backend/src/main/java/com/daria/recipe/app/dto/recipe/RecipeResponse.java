package com.daria.recipe.app.dto.recipe;

import lombok.Data;

@Data
public class RecipeResponse {
    private Long id;
    private String name;
    private Long categoryId;
    private Long userId;
    private String externalLink;
    private String description;
    private String shortDescription;
}
