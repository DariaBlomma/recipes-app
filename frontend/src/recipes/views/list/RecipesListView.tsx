import {useState} from "react";
import { RecipesList } from "../../widgets/list/RecipesList.tsx";
import { RecipesFilters } from "@/recipes/widgets/RecipesFilters.tsx";
import { BaseButton } from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import styles from "./RecipesListView.module.scss";
import { useNavigate } from "@tanstack/react-router";
import { useRecipes } from "@/recipes/hooks/useRecipes.ts";
import {clsx} from "clsx";

export function RecipesListView() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

    const { recipes, hasNextPage, loadMore, isFetchingNextPage } = useRecipes(selectedCategoryId);

    const navigate = useNavigate();
    const redirectToForm = () => {
        navigate({ to: "/recipes/create" });
    };

    return (
        <div className={clsx("base-list-layout", styles.view)}>
            <BaseButton onClick={redirectToForm}>Создать рецепт</BaseButton>

            <RecipesFilters
                selectedCategoryId={selectedCategoryId}
                onCategoryChange={setSelectedCategoryId}
            />

            <RecipesList
                recipes={recipes}
                hasNextPage={hasNextPage}
                loadMore={loadMore}
                isFetchingNextPage={isFetchingNextPage}
                filterCategoryId={selectedCategoryId}
            />
        </div>
    );
}
