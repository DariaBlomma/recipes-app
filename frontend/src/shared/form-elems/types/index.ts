import type {InputHTMLAttributes, TextareaHTMLAttributes} from "react";

export interface BaseFormElemProps {
    id: string;
    label: string;
    error?: string;
    required?: boolean;
    variant?: "dark" | "light";
}
export interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id">, BaseFormElemProps  {}

export interface BaseTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">, BaseFormElemProps {}

export interface PageDto<T> {
    content: T[];          // это твой список рецептов (List<Recipe>)
    totalElements: number; // общее количество элементов (нужно для пагинации)
    totalPages: number;    // общее количество страниц
    last: boolean;         // true, если это последняя страница
    first: boolean;        // true, если это первая страница
    size: number;          // размер страницы
    number: number;        // номер текущей страницы (0-based)
    numberOfElements: number;
}

export interface BaseGetListParams {
    page: number;
    size?: number;
}