import { useMutation } from '@tanstack/react-query';
import {extractErrorMessage} from "@/core/api/utils/errors.ts";
import type {AxiosError} from "axios";
import {useNavigate} from "@tanstack/react-router";
import type {CategoryFormData} from "@/categories/types";
import {CategoriesPersonalService} from "../services/CategoriesPersonalService.ts";

export function usePersonalCategoriesForm() {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (data: CategoryFormData & { id?: number}) => {
            return data.id ? CategoriesPersonalService.update(data.id, data) : CategoriesPersonalService.create(data);
        },
        onSuccess: () => {
            navigate({ to: '/categories' });
        },
    });

    const serverError = mutation.error ? extractErrorMessage(mutation.error as AxiosError) : null;

    return {
        submit: mutation.mutate,
        isPending: mutation.isPending,
        serverError,
        isSuccess: mutation.isSuccess,
    };
}