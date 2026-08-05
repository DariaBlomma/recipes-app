import { useInfiniteQuery } from '@tanstack/react-query';
import {RecipesService} from "@/recipes/services/RecipesService.ts";
import type {RecipesGetListParams} from "@/recipes/types";

export interface RecipeFilters {
    categoryId?: number;
    personalCategoryIds?: number[];
}
export function useRecipes(filters: RecipeFilters) {
    const { categoryId, personalCategoryIds } = filters;

    const query = useInfiniteQuery({
        queryKey: ['recipes', filters],
        queryFn: async ({ pageParam = 0 }) => {
            const params: RecipesGetListParams = { page: pageParam, size: 10 };
            if (categoryId) {
                params.categoryId = categoryId;
            }
            if (personalCategoryIds) {
                params.personalCategoryIds = personalCategoryIds;
            }
            const response = await RecipesService.getList(params);
            return {
                data: response.content,
                totalElements: response.totalElements,
                hasNextPage: !response.last,
            };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.hasNextPage) {
                return undefined;
            }
            return allPages.length;
        },
    });

    return {
        recipes: query.data?.pages.map(page => page.data).flat() || [],
        isLoading: query.isLoading,
        hasNextPage: query.hasNextPage ?? false,
        loadMore: query.fetchNextPage,
        isFetchingNextPage: query.isFetchingNextPage,
        status: query.status,
        error: query.error,
    };
}
