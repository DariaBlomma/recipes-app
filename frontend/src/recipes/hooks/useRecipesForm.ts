import { useMutation } from '@tanstack/react-query';
import {extractErrorMessage} from "@/core/api/utils/errors.ts";
import type {AxiosError} from "axios";
import {useNavigate} from "@tanstack/react-router";
import {RecipesService} from "@/recipes/services/RecipesService.ts";
import type {RecipeFormData} from "@/recipes/types";

export function useRecipesForm() {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (data: Required<RecipeFormData> & { id?: number}) => {
            return data.id ? RecipesService.update(data.id, data) : RecipesService.create(data);
        },
        onSuccess: () => {
            navigate({ to: '/recipes' });
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