package com.daria.recipe.app.service;

import com.daria.recipe.app.config.AppConfig;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final AppConfig appConfig;

    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Восстановление пароля в Recipe App");

            String resetUrl = appConfig.getFrontendBaseUrl() + "/auth/reset-password?token=" + token;

            String htmlContent = """
                <!DOCTYPE html>
                <html>
                <head><meta charset="UTF-8"></head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #4CAF50;">Восстановление пароля</h2>
                    <p>Здравствуйте! Вы запросили восстановление пароля.</p>
                    <p style="margin: 30px 0;">
                        <a href="%s" style="background-color: #4CAF50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Восстановить пароль
                        </a>
                    </p>
                    <p style="background-color: #f4f4f4; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 14px;">
                        <a href="%s" style="color: #0066cc;">%s</a>
                    </p>
                    <p style="color: #666666; font-size: 14px; margin-top: 30px;">
                        Ссылка действительна в течение <strong>%d минут</strong>.
                    </p>
                </body>
                </html>
                """.formatted(resetUrl, resetUrl, resetUrl, appConfig.getPasswordResetTtlMinutes());

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            // todo: add logger logger.error("Failed to send email", e);
            throw new RuntimeException("Не удалось отправить письмо: " + e.getMessage(), e);
        }
    }
}