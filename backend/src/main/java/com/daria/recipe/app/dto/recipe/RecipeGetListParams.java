package com.daria.recipe.app.dto.recipe;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class RecipeGetListParams {
    private Long categoryId;
    private List<Long> personalCategoryIds;
}
