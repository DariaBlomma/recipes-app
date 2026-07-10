import { useQuery } from '@tanstack/react-query';
import { CategoriesService } from '@/categories/services/CategoriesService.ts';

export function useCategories() {
    const query = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await CategoriesService.getList();
        },
    });

    return {
        categories: query.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        status: query.status,
        error: query.error,
    };
}
