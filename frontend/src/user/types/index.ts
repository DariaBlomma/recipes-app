export interface UserSchema {
    id: number;
    userName: string; // login name
    email: string;
    firstName?: string;
    lastName?: string;
    recipeIds: number[];
}