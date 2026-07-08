import type {JSX} from "react";
import styles from "./AuthForm.module.scss";
import {Link} from "@tanstack/react-router";
import { BaseInput } from "@/shared/form-elems/BaseInput/BaseInput.tsx";
import {BaseInputPassword} from "@/shared/form-elems/BaseInputPassword/BaseInputPassword.tsx";
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import { useSignUpForm } from "@/auth/hooks/useAuthSignUpForm.ts";
import { useSignUp } from "@/auth/hooks/useSignUp.ts";
import type {SignUpFormData} from "@/auth/types";
import {BaseErrorMessage} from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";

export function AuthSignUpForm(): JSX.Element {
    const { isFormInvalid, fields, handleSubmit } = useSignUpForm();
    const { signUp, isPending, serverError } = useSignUp();

    const onSubmit = (data: SignUpFormData) => {
        signUp(data);
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Зарегистрироваться</h2>

                <BaseInput
                    id="name"
                    label={"Имя пользователя"}
                    placeholder={"Имя пользователя"}
                    type={"text"}
                    required={true}
                    {...fields.userName.props}
                />
                <BaseInput
                    id="email"
                    label={"Email"}
                    placeholder="Введите email"
                    type={"email"}
                    required={true}
                    {...fields.email.props}
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

                <BaseButton type={"submit"} disabled={isFormInvalid}>
                    {isPending ? 'Загрузка...' : 'Зарегистрироваться'}
                </BaseButton>
                <div className={styles.subtext}>Уже есть аккаунт?  <Link to="/auth/login">Войти</Link></div>
            </form>
        </div>
    )
}