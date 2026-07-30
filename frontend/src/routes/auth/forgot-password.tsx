import {createFileRoute, redirect} from '@tanstack/react-router';
import {AuthService} from "@/auth/services/AuthService.ts";
import {AuthForgotPasswordView} from "@/auth/views/AuthForgotPasswordView.tsx";

export const Route = createFileRoute('/auth/forgot-password')({
    loader: async () => {
        if (AuthService.isAuthenticated) {
            throw redirect({ to: '/' });
        }

        return {};
    },
    component: AuthForgotPasswordView,
});