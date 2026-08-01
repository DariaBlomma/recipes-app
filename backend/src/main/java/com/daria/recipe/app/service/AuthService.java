package com.daria.recipe.app.service;

import com.daria.recipe.app.config.AppConfig;
import com.daria.recipe.app.dto.auth.*;
import com.daria.recipe.app.dto.user.UserResponse;
import com.daria.recipe.app.dto.user.UserResponseWithPassword;
import com.daria.recipe.app.entity.PasswordResetToken;
import com.daria.recipe.app.entity.User;
import com.daria.recipe.app.exception.ResourceNotFoundException;
import com.daria.recipe.app.exception.UnauthorizedException;
import com.daria.recipe.app.mapper.UserMapper;
import com.daria.recipe.app.repository.PasswordResetTokenRepository;
import com.daria.recipe.app.repository.UserRepository;
import com.daria.recipe.app.security.AccessTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

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

            Instant expiresAt = Instant.now().plus(appConfig.getPasswordResetTtlMinutes(), ChronoUnit.MINUTES);

            PasswordResetToken resetToken = PasswordResetToken.builder()
                    .token(token)
                    .user(user)
                    .expiresAt(expiresAt)
                    .build();
            passwordResetTokenRepository.save(resetToken);

            emailService.sendPasswordResetEmail(user.getEmail(), resetToken.getToken());
        });
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Недействительный токен восстановления"));

        if (Instant.now().isAfter(resetToken.getExpiresAt())) {
            passwordResetTokenRepository.delete(resetToken);
            throw new IllegalArgumentException("Срок действия токена истек. Запросите восстановление пароля заново.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
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