import { useMutation, useQueryClient } from '@tanstack/react-query';
import {RecipesService} from "@/recipes/services/RecipesService.ts";

export function useRecipesDelete(categoryId?: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => RecipesService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recipes-by-category', categoryId],
            });
        },
    });
}
