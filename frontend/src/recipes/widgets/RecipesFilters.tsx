import { useEffect, useState } from "react";
import type { CategorySchema } from "@/categories/types";
import { CategoriesService } from "@/categories/services/CategoriesService.ts";
import {CategoriesSingleSelect} from "@/categories/widgets/CategoriesSingleSelect.tsx";

interface RecipesFiltersProps {
    onCategoryChange: (categoryId: number | undefined) => void;
    selectedCategoryId: number | undefined;
}

export function RecipesFilters({ onCategoryChange, selectedCategoryId }: RecipesFiltersProps) {
    const [categories, setCategories] = useState<CategorySchema[]>([]);

    useEffect(() => {
        CategoriesService.getList().then((data) => setCategories(data))
    }, []);

    return (
        <div className="recipes-filters">
            <CategoriesSingleSelect
                value={selectedCategoryId}
                onChange={onCategoryChange}
                categories={categories}
                placeholder="Выберите категорию"
            />
        </div>
    );
}
