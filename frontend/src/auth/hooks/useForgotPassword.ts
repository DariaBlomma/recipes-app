import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/auth/services/AuthService';
import { extractErrorMessage } from "@/core/api/utils/errors.ts";
import type { AxiosError } from "axios";
import type { ForgotPasswordFormData } from '@/auth/types';

export function useForgotPassword() {
    const mutation = useMutation({
        mutationFn: (data: ForgotPasswordFormData) => AuthService.forgotPassword(data.email),
    });

    const serverError = mutation.error ? extractErrorMessage(mutation.error as AxiosError) : null;

    return {
        forgotPassword: mutation.mutate,
        isPending: mutation.isPending,
        serverError,
        isSuccess: mutation.isSuccess,
    };
}