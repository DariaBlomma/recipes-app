import { CategoriesList } from "../../widgets/list/CategoriesList.tsx";
import { BaseButton } from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import styles from "./CategoriesListView.module.scss";
import { useNavigate } from "@tanstack/react-router";
import {usePersonalCategories} from "../../hooks/usePersonalCategories.ts";
import {clsx} from "clsx";

export function CategoriesListView() {
    const { categories } = usePersonalCategories();

    const navigate = useNavigate();
    const redirectToForm = () => {
        navigate({ to: "/categories/create" });
    };

    return (
        <div className={clsx("base-list-layout", styles.view)}>
            <BaseButton onClick={redirectToForm}>Создать категорию</BaseButton>

            <CategoriesList
                categories={categories}
            />
        </div>
    );
}
