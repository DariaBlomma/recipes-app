import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CategoriesPersonalService} from "@/categories/services/CategoriesPersonalService.ts";

export function usePersonalCategoriesDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => CategoriesPersonalService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', 'personal'] });
            queryClient.invalidateQueries({ queryKey: ['recipes'] });
        },
    });
}