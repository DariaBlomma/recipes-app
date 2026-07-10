import { CategoriesList } from "../../widgets/list/CategoriesList.tsx";
import { BaseButton } from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import styles from "./CategoriesListView.module.scss";
import { useNavigate } from "@tanstack/react-router";
import {useCategories} from "@/categories/hooks/useCategories.ts";

export function CategoriesListView() {
    const { categories } = useCategories();

    const navigate = useNavigate();
    const redirectToForm = () => {
        navigate({ to: "/categories/create" });
    };

    return (
        <div className={styles.view}>
            <BaseButton onClick={redirectToForm}>Создать категорию</BaseButton>

            <CategoriesList
                categories={categories}
            />
        </div>
    );
}
