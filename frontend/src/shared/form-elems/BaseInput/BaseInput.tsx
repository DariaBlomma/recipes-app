import  {type JSX} from "react";
import styles from "./BaseInput.module.scss";
import type {BaseInputProps} from "@/shared/form-elems/types";
import {BaseFormElemLayout} from "@/shared/form-elems/BaseFormElemLayout/BaseFormElemLayout.tsx";
import * as React from "react";

export function BaseInput({
  label,
  id,
  className,
  error,
  required,
  variant,
  children,
  ...inputProps
}: BaseInputProps & { children?: React.ReactNode}): JSX.Element {
    const mergedInputClassName = [
        "base-input",
        styles.input,
        error ? "base-input.error" : '',
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
        <div className={styles.inputWrapper}>
            <input
                id={id}
                className={mergedInputClassName}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                {...inputProps}
            />
            { children }
        </div>
        </BaseFormElemLayout>
    )
}