import { api } from '@/core/api/AxiosInstance';
import type {RecipeSchema, RecipesGetListParams} from "@/recipes/types";
import type {PageDto} from "@/shared/form-elems/types";

export class RecipesService {
    static async getList(data: RecipesGetListParams) {
        const response = await api.get<PageDto<RecipeSchema>>(`/recipes`, { params: data } );
        return response.data;
    }

    static async getOne(id: number) {
        const response = await api.get<RecipeSchema | undefined>(`/recipes/${id}`);
        return response.data;
    }

    static async create(data: Omit<RecipeSchema, "id" | "userId">) {
        const response = await api.post<RecipeSchema | undefined>(`/recipes`, data);
        return response.data;
    }

    static async update(id: number, data: Omit<RecipeSchema, "id" | "userId">) {
        const response = await api.put<RecipeSchema | undefined>(`/recipes/${id}`, data);
        return response.data;
    }

    static async delete(id: number) {
        const response = await api.delete(`/recipes/${id}`);
        return response.data;
    }
}