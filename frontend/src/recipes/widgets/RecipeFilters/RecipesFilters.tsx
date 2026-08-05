import { useEffect, useState } from "react";
import type { CategorySchema } from "@/categories/types";
import { CategoriesCommonService } from "@/categories/services/CategoriesCommonService.ts";
import { CategoriesPersonalService } from "@/categories/services/CategoriesPersonalService.ts";
import { CategoriesSingleSelect } from "@/categories/widgets/CategoriesSingleSelect.tsx";
import { CategoriesMultiSelect } from "@/categories/widgets/CategoriesMultiSelect.tsx";
import styles from "./RecipeFilters.module.scss";

interface RecipesFiltersProps {
    selectedCategoryId: number | undefined;
    selectedPersonalCategoryIds: number[] | undefined;
    onCategoryChange: (categoryId: number | undefined) => void;
    onPersonalCategoriesChange: (ids: number[] | undefined) => void;
}

export function RecipesFilters({
   selectedCategoryId,
   selectedPersonalCategoryIds,
   onCategoryChange,
   onPersonalCategoriesChange,
}: RecipesFiltersProps) {
    const [commonCategories, setCommonCategories] = useState<CategorySchema[]>([]);
    const [personalCategories, setPersonalCategories] = useState<CategorySchema[]>([]);

    useEffect(() => {
        CategoriesCommonService.getList().then(setCommonCategories);
        CategoriesPersonalService.getList().then(setPersonalCategories);
    }, []);

    return (
        <div className={styles.filters}>
            <CategoriesSingleSelect
                value={selectedCategoryId}
                onChange={onCategoryChange}
                categories={commonCategories}
                placeholder="Общая категория"
            />
            <CategoriesMultiSelect
                value={selectedPersonalCategoryIds}
                onChange={onPersonalCategoriesChange}
                categories={personalCategories}
                placeholder="Личные категории"
            />
        </div>
    );
}