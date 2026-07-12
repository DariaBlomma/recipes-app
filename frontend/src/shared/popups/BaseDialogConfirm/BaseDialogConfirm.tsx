import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './BaseDialogConfirm.module.scss';
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";

interface BaseDialogConfirmProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    isLoading?: boolean;
    children: React.ReactNode;
}

export function BaseDialogConfirm({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  isLoading = false,
  children,
}: BaseDialogConfirmProps) {
    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={onClose}>
            <DropdownMenu.Trigger asChild>
                {children}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={styles.content}
                    sideOffset={8}
                    align="start"
                    side="top"
                >
                    <div className={styles.title}>
                        {title}
                    </div>


                    <p className={styles.message}>{message}</p>

                    <DropdownMenu.Separator className={styles.separator} />

                    <div className={styles.footer}>
                        <DropdownMenu.Item asChild>
                            <BaseButton
                                variant="danger"
                                onClick={() => onConfirm()}
                                disabled={isLoading}
                            >
                                { confirmText }
                            </BaseButton>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item asChild>
                            <BaseButton
                                variant="secondary"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                {cancelText}
                            </BaseButton>
                        </DropdownMenu.Item>
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
