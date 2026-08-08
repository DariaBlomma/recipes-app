import type { JSX } from "react";
import { Link } from "@tanstack/react-router";
import { BaseInput } from "@/shared/form-elems/BaseInput/BaseInput.tsx";
import { BaseInputPassword } from "@/shared/form-elems/BaseInputPassword/BaseInputPassword.tsx";
import { useSignUpForm } from "@/auth/hooks/useAuthSignUpForm.ts";
import { useSignUp } from "@/auth/hooks/useSignUp.ts";
import type { SignUpFormData } from "@/auth/types";
import {AuthBaseForm} from "@/auth/base/AuthBaseForm/AuthBaseForm.tsx";

export function AuthSignUpForm(): JSX.Element {
    const { isFormInvalid, fields, handleSubmit } = useSignUpForm();
    const { signUp, isPending, serverError } = useSignUp();

    const onSubmit = (data: SignUpFormData) => {
        signUp(data);
    };

    return (
        <AuthBaseForm
            title="Зарегистрироваться"
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Зарегистрироваться"
            isPending={isPending}
            isSubmitDisabled={isFormInvalid}
            serverError={serverError}
            footer={<>Уже есть аккаунт? <Link to="/auth/login">Войти</Link></>}
        >
            <BaseInput
                id="name"
                label="Имя пользователя"
                placeholder="Имя пользователя"
                type="text"
                required={true}
                {...fields.userName.props}
            />
            <BaseInput
                id="email"
                label="Email"
                placeholder="Введите email"
                type="email"
                required={true}
                {...fields.email.props}
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