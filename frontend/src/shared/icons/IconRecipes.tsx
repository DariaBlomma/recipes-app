import type {BaseIconProps} from "@/shared/types";

export function IconRecipes({
    size = 24,
    color,
    ...props
}: BaseIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: color }}
            {...props}
        >
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor" />
            <path d="M7 18C7 19.1 7.9 20 9 20H15C16.1 20 17 19.1 17 18V10C17 8.9 16.1 8 15 8H9C7.9 8 7 8.9 7 10V18Z" fill="currentColor" />
            <path d="M4 11C4 9.9 4.9 9 6 9H18C19.1 9 20 9.9 20 11V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V11Z" fill="currentColor" />
        </svg>
    );
}
