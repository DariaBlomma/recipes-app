import type {ComponentProps, ReactNode} from "react";
import { BaseButton } from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import { BaseErrorMessage } from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";
import styles from "./AurhBaseForm.module.scss"

interface AuthBaseFormProps {
    title: string;
    onSubmit: ComponentProps<'form'>['onSubmit'];
    submitLabel: string;
    isPending?: boolean;
    isSubmitDisabled?: boolean;
    serverError?: string | null;
    extra?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
}

export function AuthBaseForm({
     title,
     onSubmit,
     submitLabel,
     isPending = false,
     isSubmitDisabled = false,
     serverError,
     extra,
     footer,
     children,
 }: AuthBaseFormProps) {
    return (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
            <h2 className={styles.title}>{title}</h2>
            {children}
            {serverError && <BaseErrorMessage error={serverError} />}
            { extra }
            <BaseButton type="submit" disabled={isSubmitDisabled || isPending}>
                {isPending ? 'Загрузка...' : submitLabel}
            </BaseButton>
            {footer && <div className={styles.subtext}>{footer}</div>}
        </form>
    );
}