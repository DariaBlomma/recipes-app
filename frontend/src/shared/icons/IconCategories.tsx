import type {BaseIconProps} from "@/shared/types";

export function IconCategories({
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
            <path d="M22 19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V7C2 5.9 2.9 5 4 5H8L12 9H20C21.1 9 22 9.9 22 11V19Z" fill="currentColor" />
        </svg>
    );
}
