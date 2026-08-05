package com.daria.recipe.app.service;

import com.daria.recipe.app.dto.recipe.RecipeCreateRequest;
import com.daria.recipe.app.dto.recipe.RecipeGetListParams;
import com.daria.recipe.app.dto.recipe.RecipeResponse;
import com.daria.recipe.app.dto.recipe.RecipeUpdateRequest;
import com.daria.recipe.app.entity.Category;
import com.daria.recipe.app.entity.Recipe;
import com.daria.recipe.app.entity.User;
import com.daria.recipe.app.exception.ConflictException;
import com.daria.recipe.app.exception.ResourceNotFoundException;
import com.daria.recipe.app.helpers.PageableHelper;
import com.daria.recipe.app.mapper.RecipeMapper;
import com.daria.recipe.app.repository.CategoryRepository;
import com.daria.recipe.app.repository.RecipeRepository;
import com.daria.recipe.app.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final RecipeMapper recipeMapper;
    private final PageableHelper pageableHelper;

    private final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "id",
            "name"
    );

    @Transactional
    public RecipeResponse createRecipe(Long userId, RecipeCreateRequest createRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException( "Пользователь  с таким id не найден: " + userId));
        Category commonCategory = categoryRepository
                .findById(createRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Категория с таким id не найдена:" + createRequest.getCategoryId()
                ));

       Recipe recipe = recipeMapper.toEntity(createRequest);
       recipe.setCategory(commonCategory);
       recipe.setUser(user);

        if (createRequest.getPersonalCategoryIds() != null && !createRequest.getPersonalCategoryIds().isEmpty()) {
            List<Category> personalCategories = categoryRepository
                    .findAllActiveByIdsForActiveUser(createRequest.getPersonalCategoryIds(), userId);

            if (personalCategories.size() != createRequest.getPersonalCategoryIds().size()) {
                throw new ResourceNotFoundException(
                        "Одна из личных категорий не найдена или не принадлежит вам");
            }

            recipe.setPersonalCategories(personalCategories);
        }

       Recipe savedRecipe = recipeRepository.save(recipe);
       return recipeMapper.toResponse(savedRecipe);
    }

    @Transactional(readOnly = true)
    public RecipeResponse getOne(Long recipeId) {
        Recipe recipe = recipeRepository.findByIdWithPersonalCategories(recipeId).orElseThrow(
                () -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));
        return recipeMapper.toResponse(recipe);
    }

    @Transactional(readOnly = true)
    public Page<RecipeResponse> getList(Long userId, Pageable pageable, RecipeGetListParams filters) {
        pageableHelper.validateSortFields(pageable.getSort(), ALLOWED_SORT_FIELDS);
        Pageable stablePageable = pageableHelper.addFallbackSort(pageable);
        List<Long> personalIds = filters.getPersonalCategoryIds() == null
                ? List.of()
                : filters.getPersonalCategoryIds().stream().distinct().toList();
        boolean hasPersonalFilter = !personalIds.isEmpty();

        if (hasPersonalFilter) {
            long ownedCount = categoryRepository.countByIdInForUser(personalIds, userId);
            if (ownedCount != personalIds.size()) {
                throw new ResourceNotFoundException("Категория не найдена");
            }
        }

        Page<Recipe> recipePage = recipeRepository.findAllActivePaginatedForUser(
                userId,
                filters.getCategoryId(),
                hasPersonalFilter,
                hasPersonalFilter ? personalIds : List.of(-1L), // заглушка: IN не умеет быть пустым
                stablePageable
        );
        return recipePage.map(recipeMapper::toResponse);
    }

    @Transactional
    public RecipeResponse putRecipe (Long userId, Long recipeId, RecipeUpdateRequest request) {
        userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + userId));
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(
                () -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));
        if (!recipe.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("You can edit only your own recipes");
        }

        recipeMapper.update(request, recipe);

        long requestCategoryId = request.getCategoryId();
        if (requestCategoryId != recipe.getCategory().getId()) {
            Category category = categoryRepository
                    .findById(requestCategoryId)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with id:" + requestCategoryId
                    ));
            recipe.setCategory(category);
        }

        if (request.getPersonalCategoryIds() != null) {
            if (request.getPersonalCategoryIds().isEmpty()) {
                recipe.getPersonalCategories().clear();
            } else {
                List<Category> personalCategories = categoryRepository
                        .findAllActiveByIdsForActiveUser(request.getPersonalCategoryIds(), userId);

                if (personalCategories.size() != request.getPersonalCategoryIds().size()) {
                    throw new ResourceNotFoundException(
                            "Одна из личных категорий не найдена или не принадлежит вам");
                }

                recipe.getPersonalCategories().clear();
                recipe.getPersonalCategories().addAll(personalCategories);
            }
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        return recipeMapper.toResponse(savedRecipe);
    }

    @Transactional
    public void deleteSoft(Long userId, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(
                () -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));

        userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + userId));
        if (!recipe.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("You can delete only your own recipes");
        }

        if (recipe.isDeleted()) {
            throw new ConflictException("Recipe is already deleted");
        }
        recipe.setDeletedAt(Instant.now());
    }
}
