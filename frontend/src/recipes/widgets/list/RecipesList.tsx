import type {JSX} from "react";
import { RecipesCard } from "@/recipes/widgets/card/RecipesCard.tsx";
import styles from "./RecipesList.module.scss";

export function RecipesList(): JSX.Element{
    return (
        <div className={styles.list}>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
            <RecipesCard/>
        </div>
    )
}