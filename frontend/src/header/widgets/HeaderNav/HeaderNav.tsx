import {Link, useRouterState} from "@tanstack/react-router";
import styles from "./HeaderNav.module.scss";
import type {JSX} from "react";
import {IconRecipes} from "@/shared/icons/IconRecipes.tsx";
import {IconCategories} from "@/shared/icons/IconCategories.tsx";

export function HeaderNav(): JSX.Element {
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;

    const isRecipesActive = currentPath.startsWith("/recipes");
    const isCategoriesActive = currentPath.startsWith("/categories");

    return (
        <nav className={styles.headerNav}>
            <Link to="/recipes" className={`${styles.navItem} ${isRecipesActive ? styles.active : ""}`}>
                <span className={styles.icon}>
                    <IconRecipes/>
                </span>
                <span className={styles.label}>Рецепты</span>
            </Link>

            <Link to="/categories" className={`${styles.navItem} ${isCategoriesActive ? styles.active : ""}`}>
                <span className={styles.icon}>
                    <IconCategories/>
                </span>
                <span className={styles.label}>Мои категории</span>
            </Link>
        </nav>
    );
}
