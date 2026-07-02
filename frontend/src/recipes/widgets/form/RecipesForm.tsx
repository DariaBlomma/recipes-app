import styles from "./RecipesForm.module.scss"
import {Link} from "@tanstack/react-router";

export function RecipesForm() {
    return (
        <div> className={styles.form}
            Form - Create or Edit
            <form className={styles.form}></form>
            <Link to="/recipes">К списку рецептов</Link>
        </div>
    )
}