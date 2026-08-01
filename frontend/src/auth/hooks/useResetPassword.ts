import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/auth/services/AuthService';
import { extractErrorMessage } from "@/core/api/utils/errors.ts";
import type { AxiosError } from "axios";
import type { ResetPasswordFormData } from '@/auth/types';

export function useResetPassword(token: string) {
    const mutation = useMutation({
        mutationFn: (data: ResetPasswordFormData) =>
            AuthService.resetPassword(token, data.newPassword),
    });

    const serverError = mutation.error ? extractErrorMessage(mutation.error as AxiosError) : null;

    return {
        resetPassword: mutation.mutate,
        isPending: mutation.isPending,
        serverError,
        isSuccess: mutation.isSuccess,
    };
}