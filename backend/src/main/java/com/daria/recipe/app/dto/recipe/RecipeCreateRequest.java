package com.daria.recipe.app.dto.recipe;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class RecipeCreateRequest {
    @NotBlank(message = "Название обязательно")
    @Size(max = 200, message = "Название рецепта должно быть до 200 символов")
    private String name;

    @NotNull(message =  "Id категории обязательно")
    private Long categoryId;

    private List<Long> personalCategoryIds;

    @URL(message = "Неверный URL формат")
    @Size(max = 500)
    private String externalLink;

    @Size(max = 2000, message = "Описание должно быть до 2000 символов")
    @NotBlank(message = "Описание - обязательное поле")
    private String description;

    @Size(max = 150, message = "Короткое описание должно быть до 150 символов ")
    private String shortDescription;
}
