import {createFileRoute} from '@tanstack/react-router'
import { RecipesListView } from "../../recipes/views/list/RecipesListView.tsx";

export const Route = createFileRoute('/recipes/')({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>) => {
        const categoryId = search.categoryId !== undefined
            ? Number(search.categoryId)
            : undefined;

        const personalCategoryIds = search.personalCategoryIds !== undefined
            ? (Array.isArray(search.personalCategoryIds)
                ? search.personalCategoryIds.map(id => Number(id))
                : String(search.personalCategoryIds).split(',').map(id => Number(id)))
            : undefined;

        return {
            categoryId: isNaN(categoryId as number) ? undefined : categoryId,
            personalCategoryIds: personalCategoryIds?.some(isNaN) ? undefined : personalCategoryIds,
        };
    },
})

function RouteComponent() {
    return (
        <div>
            <RecipesListView />
        </div>
    )
}
