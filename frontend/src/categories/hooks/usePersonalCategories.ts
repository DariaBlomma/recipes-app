import { useQuery } from '@tanstack/react-query';
import { CategoriesPersonalService } from '../services/CategoriesPersonalService.ts';

export function usePersonalCategories() {
    const query = useQuery({
        queryKey: ['categories', 'personal'],
        queryFn: async () => {
            return await CategoriesPersonalService.getList();
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
