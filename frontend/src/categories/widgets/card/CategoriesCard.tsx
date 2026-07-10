import styles from "./CategoriesCard.module.scss"
import {useNavigate} from "@tanstack/react-router";
import type {CategorySchema} from "@/categories/types";

export function CategoriesCard ({ name, id } : CategorySchema) {
    const navigate = useNavigate();
    const onEditClick = () => {
        navigate({to: `/categories/edit/${id}`})
    }
    return (
        <div className={styles.card}>
            <span className={styles.title}>{ name }</span>
            <div className={styles.actionsBtns}>
                <div className={[styles.actionBtn, styles.edit].join(' ')} onClick={onEditClick}>Edit</div>
                <div className={[styles.actionBtn, styles.delete].join(' ')}>Delete</div>
                {/*todo: implement later*/}
                {/*<div className={[styles.actionBtn, styles.view].join(' ')}>View</div>*/}
            </div>
        </div>
    )
}