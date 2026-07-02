import { RecipesList } from "../../widgets/list/RecipesList.tsx";
import {RecipesFilters} from "@/recipes/widgets/RecipesFilters.tsx";
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import styles from "./RecipesListView.module.scss"
import { useNavigate } from "@tanstack/react-router";

export function RecipesListView() {
    const navigate = useNavigate();
    const redirectToForm = () => {
        navigate({ to: "/recipes/create" });
    }

    return (
        <div className={styles.view}>
            <BaseButton onClick={redirectToForm}>Создать рецепт</BaseButton>
            <RecipesFilters/>
            <RecipesList/>
        </div>
    );
}