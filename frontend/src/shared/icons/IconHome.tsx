import type {BaseIconProps} from "@/shared/types";

export function IconHome({
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
            <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" fill="currentColor" />
        </svg>
    );
}