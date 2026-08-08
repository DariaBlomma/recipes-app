import { RecipesList } from "../../widgets/list/RecipesList.tsx";
import { RecipesFilters } from "../../widgets/RecipeFilters/RecipesFilters.tsx";
import { BaseButton } from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import styles from "./RecipesListView.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useRecipes } from "@/recipes/hooks/useRecipes.ts";
import { clsx } from "clsx";

interface RecipeSearch {
    categoryId?: number;
    personalCategoryIds?: number[];
}

export function RecipesListView() {
    const search = useSearch({ strict: false }) as RecipeSearch;
    const navigate = useNavigate();

    const { recipes, hasNextPage, loadMore, isFetchingNextPage } = useRecipes({
        categoryId: search.categoryId,
        personalCategoryIds: search.personalCategoryIds,
    });

    const updateFilters = (updates: Partial<RecipeSearch>) => {
        navigate({
            to: ".",
            search: (prev: RecipeSearch) => ({ ...prev, ...updates }),
            replace: true,
        });
    };

    const redirectToForm = () => {
        navigate({ to: "/recipes/create" });
    };

    return (
        <div className={clsx("base-list-layout", styles.view)}>
            <BaseButton onClick={redirectToForm}>Создать рецепт</BaseButton>

            <RecipesFilters
                selectedCategoryId={search.categoryId}
                selectedPersonalCategoryIds={search.personalCategoryIds}
                onCategoryChange={(categoryId) => updateFilters({ categoryId })}
                onPersonalCategoriesChange={(personalCategoryIds) =>
                    updateFilters({ personalCategoryIds })
                }
            />

            <RecipesList
                recipes={recipes}
                hasNextPage={hasNextPage}
                loadMore={loadMore}
                isFetchingNextPage={isFetchingNextPage}
            />
        </div>
    );
}