package com.daria.recipe.app.service;

import com.daria.recipe.app.dto.category.CategoryCreateRequest;
import com.daria.recipe.app.dto.category.CategoryPageResponse;
import com.daria.recipe.app.dto.category.CategoryResponse;
import com.daria.recipe.app.dto.category.CategoryUpdateRequest;
import com.daria.recipe.app.entity.Category;
import com.daria.recipe.app.entity.User;
import com.daria.recipe.app.exception.ConflictException;
import com.daria.recipe.app.exception.InvalidRequestException;
import com.daria.recipe.app.exception.ResourceNotFoundException;
import com.daria.recipe.app.helpers.PageableHelper;
import com.daria.recipe.app.mapper.CategoryMapper;
import com.daria.recipe.app.repository.CategoryRepository;
import com.daria.recipe.app.repository.RecipeRepository;
import com.daria.recipe.app.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final PageableHelper pageableHelper;

    private final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "id",
            "name"
    );

    @Transactional
    public CategoryResponse createCommon(CategoryCreateRequest request) {
        if (categoryRepository.existsByNameAndUserIsNull(request.getName())) {
            throw new ConflictException("Категория с таким имененм уже существует" + request.getName());
        }
        Category category = categoryMapper.toEntity(request);
        Category saved = categoryRepository.save(category);
        return categoryMapper.toResponse(saved);
    }

    @Transactional
    public CategoryResponse createMy(Long userId, CategoryCreateRequest request) {
        if (categoryRepository.existsForUserByName(request.getName(), userId)) {
            throw new ConflictException("Категория с таким имененм уже существует" + request.getName());
        }
        User user = userRepository.getReferenceById(userId);
        Category category = categoryMapper.toEntity(request);
        category.setUser(user);
        Category saved = categoryRepository.save(category);
        return categoryMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getCommonOne(Long categoryId) {
        Category category = categoryRepository.findByIdWithRecipes(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Категория с таким id не найдена " + categoryId));
        return categoryMapper.toResponse(category);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getMyOne(Long userId, Long categoryId) {
        Category category = categoryRepository.findByIdWithRecipes(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Категория с таким id не найдена " + categoryId));
        if (!category.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Вы можете просматривать только свои собственные категории");
        }
        return categoryMapper.toResponse(category);
    }

    @Transactional(readOnly = true)
    public Page<CategoryPageResponse> getCommonListPaginated(Pageable pageable) {
        pageableHelper.validateSortFields(pageable.getSort(), ALLOWED_SORT_FIELDS);
        Pageable stablePageable = pageableHelper.addFallbackSort(pageable);
        Page<Category> categoryPage = categoryRepository.findAllActivePaginated(stablePageable);
        return categoryPage.map(categoryMapper::toPageResponse);
    }

    @Transactional(readOnly = true)
    public Page<CategoryPageResponse> getMyListPaginated(Long userId, Pageable pageable) {
        pageableHelper.validateSortFields(pageable.getSort(), ALLOWED_SORT_FIELDS);
        Pageable stablePageable = pageableHelper.addFallbackSort(pageable);
        Page<Category> categoryPage = categoryRepository.findAllActivePaginatedForUser(userId,  stablePageable);
        return categoryPage.map(categoryMapper::toPageResponse);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getCommonList() {
        return categoryRepository.findAllActiveCommon()
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getMyList(Long userId) {
        return categoryRepository.findAllActiveForUser(userId)
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }

    @Transactional
    public CategoryResponse updateMy(Long userId, Long categoryId, CategoryUpdateRequest request) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Категория с таким id не найдена: " + categoryId));

        if (category.getUser() == null) {
            throw new AccessDeniedException("Общую категорию может обновлять только админ");
        }
        if (!category.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Можно обновлять только свои категории");
        }

        if (categoryRepository.isNameTaken(
                request.getName(), userId, categoryId)) {
            throw new ConflictException("Категория с таким названием уже существует: " + request.getName());
        }

        categoryMapper.update(request, category);
        Category categorySaved = categoryRepository.save(category);
        return categoryMapper.toResponse(categorySaved);
    }

    @Transactional
    public CategoryResponse updateCommon(Long categoryId, CategoryUpdateRequest request) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Категория с таким id не найдена: " + categoryId));
        if (categoryRepository.existsByName(request.getName())) {
            throw new ConflictException("Категория с таким названием уже существует: " + request.getName());
        }

        categoryMapper.update(request, category);
        Category categorySaved = categoryRepository.save(category);
        return categoryMapper.toResponse(categorySaved);
    }

    @Transactional
    public void deleteMySoft(Long userId, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Категория с таким id не найдена: " + categoryId));
        userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("Пользователь не найден с таким id: " + userId));

        if (category.getUser() == null) {
            throw new AccessDeniedException("Общую категорию может удалять только админ");
        }
        if (!category.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Вы можете удалять только свои собственные категории");
        }
        if (category.isDeleted()) {
            throw new ConflictException("Категория уже удалена");
        }

        category.setDeletedAt(Instant.now());
    }

    public void deleteCommonSoft(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
                new ResourceNotFoundException("Категория с таким id не найдена: " + categoryId));

        if (category.isDeleted()) {
            throw new ConflictException("Категория уже удалена");
        }

        category.setDeletedAt(Instant.now());
    }
}
