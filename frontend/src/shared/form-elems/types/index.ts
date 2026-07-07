import type {InputHTMLAttributes} from "react";

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

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