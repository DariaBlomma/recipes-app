package com.daria.recipe.app.service;

import com.daria.recipe.app.entity.RefreshToken;
import com.daria.recipe.app.entity.User;
import com.daria.recipe.app.exception.InvalidTokenException;
import com.daria.recipe.app.exception.ResourceNotFoundException;
import com.daria.recipe.app.repository.RefreshTokenRepository;
import com.daria.recipe.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Transactional
    public UUID createRefreshToken(Long userId) {
        User user = userRepository.findActiveById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found or deleted: " + userId)
        );
        refreshTokenRepository.findByUserId(userId).ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID())
                .expiresAt(Instant.now().plus(30, ChronoUnit.DAYS))
                .revoked(false)
                .build();

        RefreshToken saved = refreshTokenRepository.save(refreshToken);
        return saved.getToken();
    }

    public UUID verifyRefreshToken(String tokenValue) {
        UUID tokenUuid;
        try {
            tokenUuid = UUID.fromString(tokenValue);
        } catch (IllegalArgumentException e) {
            throw new InvalidTokenException("Invalid refresh token format");
        }

        RefreshToken refreshToken = refreshTokenRepository.findByToken(tokenUuid)
                .orElseThrow(() -> new InvalidTokenException("Refresh token not found"));

        if (refreshToken.isRevoked()) {
            throw new InvalidTokenException("Refresh token has been revoked");
        }

        if (refreshToken.getExpiresAt().isBefore(Instant.now())) {
            throw new InvalidTokenException("Refresh token has expired");
        }

        return refreshToken.getToken();
    }

    @Transactional
    public void revokeRefreshToken(Long userId) {
        userRepository.findActiveById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found or deleted: " + userId)
        );
        refreshTokenRepository.findByUserId(userId)
                .ifPresent(refreshTokenRepository::delete);
    }

    public UUID rotateRefreshToken(Long userId) {
        revokeRefreshToken(userId);
        return createRefreshToken(userId);
    }

    @Transactional
    public void cleanExpiredTokens() {
        refreshTokenRepository.deleteByExpiresAtBefore(Instant.now());
    }
}
