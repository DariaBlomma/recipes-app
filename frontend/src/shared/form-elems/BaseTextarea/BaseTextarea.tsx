import type { JSX } from "react";
import styles from "./BaseTextarea.module.scss";
import type {BaseTextareaProps} from "@/shared/form-elems/types";
import {BaseFormElemLayout} from "@/shared/form-elems/BaseFormElemLayout/BaseFormElemLayout.tsx";

export function BaseTextarea({
     label,
     id,
     className,
     error,
     required,
    variant,
     ...inputProps
 }: BaseTextareaProps): JSX.Element {
    const mergedClassName = [
        "base-input",
        styles.input,
        error ? "base-input.error" : "",
        className || "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <BaseFormElemLayout
            id={id}
            label={label}
            required={required}
            error={error}
            variant={variant}
        >
            <textarea
                id={id}
                className={mergedClassName}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                {...inputProps}
            />
        </BaseFormElemLayout>
    );
}
