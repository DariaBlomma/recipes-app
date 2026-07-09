import styles from "./RecipesCard.module.scss"
import type {RecipeSchema} from "@/recipes/types";
import {useNavigate} from "@tanstack/react-router";

export function RecipesCard ({ description, name, externalLink, id } : RecipeSchema) {
    const navigate = useNavigate();
    const onEditClick = () => {
        navigate({to: `/recipes/edit/${id}`})
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
                <div className={[styles.actionBtn, styles.delete].join(' ')}>Delete</div>
                {/*todo: implement later*/}
                {/*<div className={[styles.actionBtn, styles.view].join(' ')}>View</div>*/}
            </div>
        </div>
    )
}