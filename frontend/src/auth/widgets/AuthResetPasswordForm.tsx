import type { JSX } from "react";
import styles from "../base/AuthBaseForm/AurhBaseForm.module.scss";
import { Link, useSearch } from "@tanstack/react-router";
import { BaseInputPassword } from "@/shared/form-elems/BaseInputPassword/BaseInputPassword.tsx";
import { BaseErrorMessage } from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";
import { useResetPasswordForm } from "@/auth/hooks/useResetPasswordForm.ts";
import { useResetPassword } from "@/auth/hooks/useResetPassword.ts";
import type { ResetPasswordFormData } from "@/auth/types";
import { AuthBaseForm } from "@/auth/base/AuthBaseForm/AuthBaseForm.tsx";

export function AuthResetPasswordForm(): JSX.Element {
    const search = useSearch({ from: '/auth/reset-password' }) as { token?: string };
    const token = search?.token || "";

    const { fields, isFormInvalid, handleSubmit } = useResetPasswordForm();
    const { resetPassword, isPending, serverError, isSuccess } = useResetPassword(token);

    const onSubmit = (data: ResetPasswordFormData) => {
        resetPassword(data);
    };

    if (!token) {
        return (
            <div className={styles.form}>
                <h2 className={styles.title}>Ошибка</h2>
                <BaseErrorMessage error="Ссылка недействительна или отсутствует токен." />
                <div className={styles.subtext}><Link to="/auth/login">Вернуться ко входу</Link></div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className={styles.form}>
                <h2 className={styles.title}>Пароль изменен!</h2>
                <p style={{ textAlign: "center", marginBottom: "24px", color: "#666" }}>
                    Ваш пароль успешно обновлен. Теперь вы можете войти в систему.
                </p>
                <div className={styles.subtext}>
                    <Link to="/auth/login">Войти</Link>
                </div>
            </div>
        );
    }

    return (
        <AuthBaseForm
            title="Новый пароль"
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Сохранить пароль"
            isPending={isPending}
            isSubmitDisabled={isFormInvalid}
            serverError={serverError}
            footer={<Link to="/auth/login">Вернуться ко входу</Link>}
        >
            <BaseInputPassword
                id="newPassword"
                label="Новый пароль"
                placeholder="Введите новый пароль"
                required={true}
                {...fields.newPassword.props}
            />
            <BaseInputPassword
                id="confirmPassword"
                label="Подтвердите пароль"
                placeholder="Повторите новый пароль"
                required={true}
                {...fields.confirmPassword.props}
            />
        </AuthBaseForm>
    );
}