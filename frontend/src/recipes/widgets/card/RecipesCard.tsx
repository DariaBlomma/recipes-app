import styles from "./RecipesCard.module.scss"
import type {RecipeSchema} from "@/recipes/types";

type Props = Omit<RecipeSchema, "id">
export function RecipesCard ({ description, name, externalLink } : Props) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{ name }</h3>
            <p className={styles.description}>{ description }</p>
            <a href={externalLink}>External link</a>
            {/*todo: display categories?*/}
            <div className={styles.tags}>
                <div className={styles.tag}>Tag 1</div>
                <div className={styles.tag}>Tag 2</div>
            </div>
            <div className={styles.footer}>
                <div className={[styles.actionBtn, styles.edit].join(' ')}>Edit</div>
                <div className={[styles.actionBtn, styles.delete].join(' ')}>Delete</div>
                <div className={[styles.actionBtn, styles.view].join(' ')}>View</div>
            </div>
        </div>
    )
}