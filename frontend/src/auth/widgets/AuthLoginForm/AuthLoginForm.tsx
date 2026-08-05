import {AuthBaseForm} from "@/auth/base/AuthBaseForm/AuthBaseForm.tsx";
import {BaseInput} from "@/shared/form-elems/BaseInput/BaseInput.tsx";
import {Link} from "@tanstack/react-router";
import {useLogin} from "@/auth/hooks/useLogin.ts";
import {useLoginForm} from "@/auth/hooks/useAuthLoginForm.ts";
import { type JSX } from "react";
import {BaseInputPassword} from "@/shared/form-elems/BaseInputPassword/BaseInputPassword.tsx";
import styles from "./AuthLoginForm.module.scss"
import type {SubmitHandler} from "react-hook-form";
import type {LoginFormData} from "@/auth/types";

export function AuthLoginForm(): JSX.Element {
    const { isFormInvalid, fields, handleSubmit } = useLoginForm();
    const { login, isPending, serverError } = useLogin();

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        login(data);
    };
    return (
        <AuthBaseForm
            title="Войти"
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Войти"
            isPending={isPending}
            isSubmitDisabled={isFormInvalid}
            serverError={serverError}
            extra={
                <div className={styles.forgotPasswordLink}>
                    <Link to="/auth/forgot-password">Забыли пароль?</Link>
                </div>
            }
            footer={<>Нет аккаунта? <Link to="/auth/sign-up">Зарегистрироваться</Link></>}
        >
            <BaseInput
                id="name"
                label="Имя пользователя"
                placeholder="Имя пользователя"
                type="text"
                required={true}
                {...fields.userName.props}
            />
            <BaseInputPassword
                id="password"
                label="Пароль"
                placeholder="Введите пароль"
                required={true}
                {...fields.password.props}
            />
        </AuthBaseForm>
    );
}