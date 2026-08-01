export * from "./api";

export interface SignUpFormData {
    userName: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    userName: string;
    password: string;
}

export type ForgotPasswordFormData = {
    email: string;
};

export type ResetPasswordFormData = {
    newPassword: string;
    confirmPassword: string;
};