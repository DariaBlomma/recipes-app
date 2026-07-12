import styles from "./RecipesCard.module.scss"
import type {RecipeSchema} from "@/recipes/types";
import {useNavigate} from "@tanstack/react-router";
import {BaseDialogConfirm} from "@/shared/popups/BaseDialogConfirm/BaseDialogConfirm.tsx";
import {useState} from "react";
import {useRecipesDelete} from "@/recipes/hooks/useRecipesDelete.ts";

export function RecipesCard ({ description, name, externalLink, id, filterCategoryId } : RecipeSchema & { filterCategoryId?: number}) {
    const navigate = useNavigate();
    const deleteMutation = useRecipesDelete(filterCategoryId)

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const onEditClick = () => {
        navigate({to: `/recipes/edit/${id}`})
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
            <h3 className={styles.title}>{ name }</h3>
            <p className={styles.description}>{ description }</p>
            <a href={externalLink}>External link</a>
            {/*todo: left for future/ Maybe categories, or ingeredients*/}
            {/*<div className={styles.tags}>*/}
            {/*    <div className={styles.tag}>Tag 1</div>*/}
            {/*    <div className={styles.tag}>Tag 2</div>*/}
            {/*</div>*/}
            <div className={styles.footer}>
                <div className={[styles.actionBtn, styles.edit].join(' ')} onClick={onEditClick}>Edit</div>
                <BaseDialogConfirm
                    isOpen={isDeleteDialogOpen}
                    title="Удалить рецепт"
                    message={`Вы уверены, что хотите удалить рецепт "${name}"?.`}
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