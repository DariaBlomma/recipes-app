package com.daria.recipe.app.repository;

import com.daria.recipe.app.entity.Category;
import com.daria.recipe.app.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("SELECT r FROM Recipe r JOIN FETCH r.category  WHERE  r.id = :id")
    Optional<Recipe> findByIdWithCategory(@Param("id") Long id);

    @Query("SELECT r FROM Recipe r LEFT JOIN FETCH r.personalCategories WHERE r.id = :id AND r.deletedAt IS NULL")
    Optional<Recipe> findByIdWithPersonalCategories(@Param("id") Long id);

    @Query("""
        SELECT r FROM Recipe r 
        JOIN FETCH r.category 
        JOIN FETCH r.user    
        WHERE  r.id = :id
    """)
    Optional<Recipe> findByIdWithCategoryAndUser(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Recipe r SET r.category.id = :newCategoryId WHERE r.category.id = :oldCategoryId")
    void moveRecipesToCategory(@Param("oldCategoryId") Long oldCategoryId,
                              @Param("newCategoryId") Long newCategoryId);


    @Query("""
    SELECT r FROM Recipe r
    WHERE r.deletedAt IS NULL
      AND r.user.id = :userId
      AND (:categoryId IS NULL OR r.category.id = :categoryId)
      AND (:hasPersonalFilter = false OR EXISTS (
          SELECT pc.id FROM Recipe rec JOIN rec.personalCategories pc
          WHERE rec.id = r.id AND pc.id IN :personalCategoryIds
      ))
    """)
    Page<Recipe> findAllActivePaginatedForUser(@Param("userId") Long userId,
                                               @Param("categoryId") Long categoryId,
                                               @Param("hasPersonalFilter") boolean hasPersonalFilter,
                                               @Param("personalCategoryIds") List<Long> personalCategoryIds,
                                               Pageable pageable);
}
