export interface CategorySchema {
    id: number;
    name: string;
    recipeIds: number[];
}

export type CategoryPage = Omit<CategorySchema, "recipeIds">