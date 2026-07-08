import type {JSX} from "react";
import styles from "./BaseInput.module.scss";
import type {BaseInputProps} from "@/shared/form-elems/types";
import {BaseFormElemLayout} from "@/shared/form-elems/BaseFormElemLayout/BaseFormElemLayout.tsx";

export function BaseInput({ label, id, className, error, required, variant, ...inputProps }: BaseInputProps): JSX.Element {
    const mergedInputClassName = [
        styles.input,
        error ? styles.inputError : '',
        className || '',
    ].filter(Boolean).join(' ');

    return (
        <BaseFormElemLayout
            id={id}
            label={label}
            required={required}
            error={error}
            variant={variant}
        >
            <input
                id={id}
                className={mergedInputClassName}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                {...inputProps}
            />
        </BaseFormElemLayout>
    )
}