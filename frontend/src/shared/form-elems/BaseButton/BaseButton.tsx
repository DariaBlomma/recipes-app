import type {ButtonHTMLAttributes, JSX} from "react";
import styles from "./BaseButton.module.scss";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    label?: string;
    variant?: "primary" | "secondary" | "outlined" | "danger";
}
export function BaseButton({ label, disabled, className, children, variant = "primary", ...props }: BaseButtonProps): JSX.Element {
    const mergedClassName = [
        styles.button,
        disabled ? styles.disabled : '',
        styles[variant],
        className || '',
    ].filter(Boolean).join(' ');

    return (
        <button className={mergedClassName} disabled={disabled} {...props}>
            { children }
        </button>
    )
}