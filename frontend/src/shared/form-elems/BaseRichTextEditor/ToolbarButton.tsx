import type { ReactNode } from 'react';
import styles from './BaseRichTextEditor.module.scss';

interface Props {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title?: string;
    children: ReactNode;
}

export function ToolbarButton({ onClick, active, disabled, title, children }: Props) {
    return (
        <button
            type="button"
            className={`${styles.toolbarButton} ${active ? styles.active : ''}`}
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            {children}
        </button>
    );
}