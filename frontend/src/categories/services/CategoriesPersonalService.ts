import { api } from '@/core/api/AxiosInstance';
import type {BaseGetListParams, PageDto} from "@/shared/form-elems/types";
import type {CategoryPage, CategorySchema} from "@/categories/types";

const baseUrl = "categories-personal"
export class CategoriesPersonalService {
    static async getListPaginated(data: BaseGetListParams) {
        const response = await api.get<PageDto<CategoryPage>>(`/${baseUrl}/paginated`, { params: data } );
        return response.data;
    }

    static async getList() {
        const response = await api.get<CategorySchema[]>(`/${baseUrl}`);
        return response.data;
    }

    static async getOne(id: number) {
        const response = await api.get<CategorySchema | undefined>(`/${baseUrl}/${id}`);
        return response.data;
    }

    static async create(data: Omit<CategorySchema, "id" | "recipeIds">) {
        const response = await api.post<CategorySchema | undefined>(`/${baseUrl}`, data);
        return response.data;
    }

    static async update(id: number, data: Omit<CategorySchema, "id" | "recipeIds">) {
        const response = await api.put<CategorySchema | undefined>(`/${baseUrl}/${id}`, data);
        return response.data;
    }

    static async delete(id: number) {
        const response = await api.delete(`/${baseUrl}/${id}`);
        return response.data;
    }
}