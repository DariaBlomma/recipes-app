package com.daria.recipe.app.service;

import com.daria.recipe.app.config.AppConfig;
import com.daria.recipe.app.dto.auth.*;
import com.daria.recipe.app.dto.user.UserResponse;
import com.daria.recipe.app.dto.user.UserResponseWithPassword;
import com.daria.recipe.app.entity.User;
import com.daria.recipe.app.exception.ResourceNotFoundException;
import com.daria.recipe.app.exception.UnauthorizedException;
import com.daria.recipe.app.mapper.UserMapper;
import com.daria.recipe.app.repository.UserRepository;
import com.daria.recipe.app.security.AccessTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final UserMapper userMapper;
    private final AccessTokenService accessTokenService;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;
    private final AppConfig appConfig;

    @Transactional
    public AuthResponse signUp(SignUpRequest request) {
        UserResponse userResponse = userService.create(request);
        UUID refreshToken = refreshTokenService.createRefreshToken(userResponse.getId());
        return buildAuthResponse(userResponse, refreshToken);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        UserResponseWithPassword user = userService.getMeWithPassword(request.getUserName());
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        UUID refreshToken = refreshTokenService.rotateRefreshToken(user.getId());
        return buildAuthResponse(userMapper.fromWithPasswordToResponse(user), refreshToken);
    }

    @Transactional
    public AuthResponse refresh(Long userId, RefreshTokenRequest request) {
        User user = userRepository.findActiveById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found or deleted: " + userId));
        refreshTokenService.verifyRefreshToken(request.refreshToken());
        UUID refresh = refreshTokenService.rotateRefreshToken(userId);
        return buildAuthResponse(userMapper.toResponse(user), refresh);
    }

    @Transactional
    public void logout(Long userId) {
        refreshTokenService.revokeRefreshToken(userId);
    }

    @Transactional
    public void handleForgotPassword(ForgotPasswordRequest request) {
        userRepository.findActiveByEmail(request.getEmail()).ifPresent(user -> {
            String token = generateSecureToken();

            ZonedDateTime expiresAt = ZonedDateTime.ofInstant(
                    Instant.now().plusSeconds(30 * 60),
                    ZoneId.systemDefault()
            );

            // 4. Сохраняем токен в БД
            var resetToken = new PasswordResetToken(); // твоя сущность
            resetToken.setEmail(email);
            resetToken.setToken(token);
            resetToken.setExpiresAt(expiresAt);
            resetToken.setUsed(false);
            tokenRepository.save(resetToken);

            // 5. Формируем ссылку сброса
            String resetLink = appConfig.getFrontendBaseUrl() + "/auth/reset-password?token=" + token;

            // 6. Отправляем письмо
            sendResetEmail(email, resetLink)

        });
    }

    private AuthResponse buildAuthResponse(UserResponse user, UUID refreshToken) {
        String token = accessTokenService.generateToken(
                user.getUserName(),
                user.getId(),
                user.getEmail()
        );

        return AuthResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .expiresAt(accessTokenService.getExpiresAt())
                .userName(user.getUserName())
                .userId(user.getId())
                .build();
    }


    private String generateSecureToken() {
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}