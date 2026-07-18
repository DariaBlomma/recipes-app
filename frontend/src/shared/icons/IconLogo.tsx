import type {BaseIconProps} from "@/shared/types";

export function IconLogo({
    size = 24,
    color,
    ...props
}: BaseIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: color }}
            {...props}
        >
            <rect width="100" height="100" rx="20" fill="#f97316"/>
            <text x="50" y="68" fontSize="56" textAnchor="middle" fill="currentColor" fontFamily="sans-serif">🍽</text>
        </svg>
    );
}
