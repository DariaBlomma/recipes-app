import {createFileRoute} from '@tanstack/react-router'
import { RecipesListView } from "../../recipes/views/list/RecipesListView.tsx";

interface RecipesSearch {
    categoryId?: number;
    personalCategoryIds?: number[];
}

export const Route = createFileRoute('/recipes/')({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>): RecipesSearch => {
        const categoryId = typeof search.categoryId === 'string'
            ? parseInt(search.categoryId, 10)
            : undefined;
        const personalCategoryIds = Array.isArray(search.personalCategoryIds)
            ? search.personalCategoryIds.map(id => parseInt(id, 10))
            : typeof search.personalCategoryIds === 'string'
                ? search.personalCategoryIds.split(',').map(id => parseInt(id, 10))
                : undefined;

        return {
            categoryId: isNaN(categoryId as number) ? undefined : categoryId,
            personalCategoryIds: personalCategoryIds?.some(isNaN) ? undefined : personalCategoryIds,
        };
    },
});
function RouteComponent() {
    return (
        <div>
            <RecipesListView />
        </div>
    )
}
