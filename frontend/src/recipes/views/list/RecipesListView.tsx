import { RecipesList } from "../../widgets/list/RecipesList.tsx";
import {RecipesFilters} from "@/recipes/widgets/RecipesFilters.tsx";
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import styles from "./RecipesListView.module.scss"
import { useNavigate } from "@tanstack/react-router";
import {useRecipes} from "@/recipes/hooks/useRecipes.ts";

export function RecipesListView() {
    const categoryId = 1;//tmp
    const { recipes, hasNextPage, loadMore, isFetchingNextPage } = useRecipes(categoryId);

    const navigate = useNavigate();
    const redirectToForm = () => {
        navigate({ to: "/recipes/create" });
    }

    return (
        <div className={styles.view}>
            <BaseButton onClick={redirectToForm}>Создать рецепт</BaseButton>
            <RecipesFilters/>
            <RecipesList
                recipes={recipes}
                hasNextPage={hasNextPage}
                loadMore={loadMore}
                isFetchingNextPage={isFetchingNextPage}
            />
        </div>
    );
}