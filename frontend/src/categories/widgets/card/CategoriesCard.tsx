import styles from "./CategoriesCard.module.scss"
import {useNavigate} from "@tanstack/react-router";
import type {CategorySchema} from "@/categories/types";
import {BaseDialogConfirm} from "@/shared/popups/BaseDialogConfirm/BaseDialogConfirm.tsx";
import {useState} from "react";
import {usePersonalCategoriesDelete} from "@/categories/hooks/usePersonalCategoriesDelete.ts";

export function CategoriesCard ({ name, id } : CategorySchema) {
    const navigate = useNavigate();

    const deleteMutation = usePersonalCategoriesDelete();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const onEditClick = () => {
        navigate({to: `/categories/edit/${id}`})
    }

    const onDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    }

    const onDeleteConfirm = () => {
        deleteMutation.mutate(id)
    }

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    }

    return (
        <div className={styles.card}>
            <span className={styles.title}>{ name }</span>
            <div className={styles.actionsBtns}>
                <div className={[styles.actionBtn, styles.edit].join(' ')} onClick={onEditClick}>Edit</div>
                <BaseDialogConfirm
                    isOpen={isDeleteDialogOpen}
                    title="Удалить категорию"
                    message={`Вы уверены, что хотите удалить категорию "${name}"?.`}
                    confirmText="Удалить"
                    cancelText="Отмена"
                    onConfirm={onDeleteConfirm}
                    onClose={closeDeleteDialog}
                >
                    <div className={[styles.actionBtn, styles.delete].join(' ')} onClick={onDeleteClick}>
                        Delete
                    </div>
                </BaseDialogConfirm>
                {/*todo: implement later*/}
                {/*<div className={[styles.actionBtn, styles.view].join(' ')}>View</div>*/}
            </div>
        </div>
    )
}