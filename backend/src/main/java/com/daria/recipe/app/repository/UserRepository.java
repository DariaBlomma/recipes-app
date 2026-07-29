package com.daria.recipe.app.repository;

import com.daria.recipe.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.id = :id AND u.deletedAt IS NULL")
    Optional<User> findActiveById(@Param("id") Long id);

    @Query("SELECT u FROM User u WHERE u.userName = :userName AND u.deletedAt IS NULL")
    Optional<User> findActiveByUserName(@Param("userName") String userName);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.deletedAt IS NULL")
    Optional<User> findActiveByEmail(String email);

    Optional<User> findByUserName(String userName);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.recipes WHERE u.id = :id")
    Optional<User> findByIdWithRecipes(@Param("id") Long id);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.recipes WHERE u.userName = :userName")
    Optional<User> findByUserNameWithRecipes(@Param("userName") String userName);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    boolean existsByUserNameAndDeletedAtIsNull(String username);
}
