package com.daria.recipe.app.repository;

import com.daria.recipe.app.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.recipes WHERE c.id = :id")
    Optional<Category> findByIdWithRecipes(@Param("id") Long id);

    @Query("SELECT c FROM Category c WHERE c.user.id = :userId AND c.deletedAt IS NULL")
    Page<Category> findAllActivePaginatedForUser(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT c FROM Category c WHERE c.user.id = :userId AND c.deletedAt IS NULL")
    List<Category> findAllActiveForUser(@Param("userId") Long userId);
}
