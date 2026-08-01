import type { JSX } from "react";
import styles from "./AuthForm.module.scss";
import { Link, useSearch } from "@tanstack/react-router";
import { BaseInputPassword } from "@/shared/form-elems/BaseInputPassword/BaseInputPassword.tsx";
import { BaseButton } from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import { BaseErrorMessage } from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";
import { useResetPasswordForm } from "@/auth/hooks/useResetPasswordForm.ts";
import { useResetPassword } from "@/auth/hooks/useResetPassword.ts";
import type { ResetPasswordFormData } from "@/auth/types";

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
            <div className={styles.formWrapper}>
                <div className={styles.form}>
                    <h2 className={styles.title}>Ошибка</h2>
                    <BaseErrorMessage error="Ссылка недействительна или отсутствует токен." />
                    <div className={styles.subtext}><Link to="/auth/login">Вернуться ко входу</Link></div>
                </div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className={styles.formWrapper}>
                <div className={styles.form}>
                    <h2 className={styles.title}>Пароль изменен!</h2>
                    <p style={{ textAlign: "center", marginBottom: "24px", color: "#666" }}>
                        Ваш пароль успешно обновлен. Теперь вы можете войти в систему.
                    </p>
                    <div className={styles.subtext}>
                        <Link to="/auth/login">Войти</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Новый пароль</h2>

                <BaseInputPassword
                    id="newPassword"
                    label={"Новый пароль"}
                    placeholder="Введите новый пароль"
                    required={true}
                    {...fields.newPassword.props}
                />

                <BaseInputPassword
                    id="confirmPassword"
                    label={"Подтвердите пароль"}
                    placeholder="Повторите новый пароль"
                    required={true}
                    {...fields.confirmPassword.props}
                />

                {serverError && <BaseErrorMessage error={serverError} />}

                <BaseButton type={"submit"} disabled={isFormInvalid || isPending}>
                    {isPending ? "Сохранение..." : "Сохранить пароль"}
                </BaseButton>

                <div className={styles.subtext}>
                    <Link to="/auth/login">Вернуться ко входу</Link>
                </div>
            </form>
        </div>
    );
}