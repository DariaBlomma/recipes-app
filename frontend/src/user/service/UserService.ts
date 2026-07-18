import { api } from '@/core/api/AxiosInstance';
import type {UserSchema} from "@/user/types";

const baseUrl = "user"
export class UserService {
    static async getMe() {
        const response = await api.get<UserSchema | undefined>(`/${baseUrl}/me`);
        return response.data;
    }
}