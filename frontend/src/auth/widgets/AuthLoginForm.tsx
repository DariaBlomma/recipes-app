import type {JSX} from "react";
import styles from "./AuthForm.module.scss";
import {Link} from "@tanstack/react-router";
import { BaseInput } from "@/shared/form-elems/BaseInput/BaseInput.tsx";
import {BaseInputPassword} from "@/shared/form-elems/BaseInputPassword/BaseInputPassword.tsx";
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import { useLoginForm } from "@/auth/hooks/useAuthLoginForm.ts";
import type {LoginFormData} from "@/auth/types";
import {useLogin} from "@/auth/hooks/useLogin.ts";
import {BaseErrorMessage} from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";

export function AuthLoginForm(): JSX.Element {
    const {  isFormInvalid, fields, handleSubmit} = useLoginForm();
    const { login, isPending, serverError } = useLogin();

    const onSubmit = (data: LoginFormData) => {
        login(data)
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Войти</h2>

                <BaseInput
                    id="name"
                    label={"Имя пользователя"}
                    placeholder={"Имя пользователя"}
                    type={"text"}
                    required={true}
                    {...fields.userName.props}
                />

                <BaseInputPassword
                    id="password"
                    label={"Пароль"}
                    placeholder="Введите пароль"
                    required={true}
                    {...fields.password.props}
                />

                {serverError && (
                    <BaseErrorMessage error={serverError}/>
                )}

                <div className={styles.forgotPasswordLink}>
                    <Link to="/auth/forgot-password">Забыли пароль?</Link>
                </div>

                <BaseButton type={"submit"} disabled={isFormInvalid}>
                    {isPending ? 'Загрузка...' : 'Войти'}
                </BaseButton>
                <div className={styles.subtext}>Нет аккаунта?  <Link to="/auth/sign-up">Зарегистрироваться</Link></div>
            </form>
        </div>
    )
}