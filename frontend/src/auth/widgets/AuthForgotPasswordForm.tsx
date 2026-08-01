import type { JSX } from "react";
import styles from "./AuthForm.module.scss";
import { Link } from "@tanstack/react-router";
import { BaseInput } from "@/shared/form-elems/BaseInput/BaseInput.tsx";
import { BaseButton } from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import { BaseErrorMessage } from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";
import { useForgotPasswordForm } from "@/auth/hooks/useForgotPasswordForm.ts";
import { useForgotPassword } from "@/auth/hooks/useForgotPassword.ts";
import type { ForgotPasswordFormData } from "@/auth/types";

export function AuthForgotPasswordForm(): JSX.Element {
    const { fields, isFormInvalid, handleSubmit } = useForgotPasswordForm();
    const { forgotPassword, isPending, serverError, isSuccess } = useForgotPassword();

    const onSubmit = (data: ForgotPasswordFormData) => {
        forgotPassword(data);
    };

    if (isSuccess) {
        return (
            <div className={styles.formWrapper}>
                <div className={styles.form}>
                    <h2 className={styles.title}>Письмо отправлено</h2>
                    <p style={{ textAlign: "center", marginBottom: "24px", color: "#666" }}>
                        Если указанный email существует в нашей системе, мы отправили на него ссылку для восстановления пароля.
                    </p>
                    <div className={styles.subtext}>
                        <Link to="/auth/login">Вернуться ко входу</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Забыли пароль?</h2>
                <p style={{ textAlign: "center", marginBottom: "24px", color: "#666" }}>
                    Введите email, указанный при регистрации, и мы отправим вам инструкцию.
                </p>

                <BaseInput
                    id="email"
                    label={"Email"}
                    placeholder={"example@mail.com"}
                    type={"email"}
                    required={true}
                    {...fields.email.props}
                />

                {serverError && <BaseErrorMessage error={serverError} />}

                <BaseButton type={"submit"} disabled={isFormInvalid || isPending} style={{ marginTop: '16px' }}>
                    {isPending ? "Отправка..." : "Отправить ссылку"}
                </BaseButton>

                <div className={styles.subtext}>
                    <Link to="/auth/login">Вернуться ко входу</Link>
                </div>
            </form>
        </div>
    );
}