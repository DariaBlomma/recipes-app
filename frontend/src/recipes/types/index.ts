import type {BaseGetListParams} from "@/shared/form-elems/types";

export interface RecipeFormData extends Omit<RecipeSchema, "userId" | "id" | "categoryId">  {
    id?: number;
    categoryId?: number | undefined;
}

export interface RecipesGetListParams extends BaseGetListParams{
    categoryId?: number;
}

export interface RecipeSchema {
    id: number;
    userId: number;
    name: string;
    externalLink?: string;
    description: string;
    categoryId: number;
}