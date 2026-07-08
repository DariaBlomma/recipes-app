import type { ReactNode, JSX } from "react";
import styles from "./BaseFormElemLayout.module.scss";
import type {BaseFormElemProps} from "@/shared/form-elems/types";
import {BaseErrorMessage} from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";

interface BaseFormElemLayoutProps extends BaseFormElemProps {
    children: ReactNode;
}

export function BaseFormElemLayout({
       label,
       id,
       error,
       required,
       children,
        variant
    }: BaseFormElemLayoutProps): JSX.Element {
    const variantClass = variant ? styles[`field_${variant}`] : "";

    return (
        <div className={`${styles.field} ${variantClass}`.trim()}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                    {required && <span className={styles.requiredStar}> *</span>}
                </label>
            )}

            {children}

            {error && (
                <BaseErrorMessage error={error}/>
            )}
        </div>
    );
}
