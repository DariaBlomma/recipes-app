import {Link, useRouterState} from "@tanstack/react-router";
import styles from "./HeaderNav.module.scss";
import type {JSX} from "react";
import {IconRecipes} from "@/shared/icons/IconRecipes.tsx";
import {IconCategories} from "@/shared/icons/IconCategories.tsx";
import {IconHome} from "@/shared/icons/IconHome.tsx";

export function HeaderNav(): JSX.Element {
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;

    const isRecipesActive = currentPath.startsWith("/recipes");
    const isCategoriesActive = currentPath.startsWith("/categories");
    const isHomeActive = currentPath === "/";

    return (
        <nav className={styles.headerNav}>
            <Link to="/" search={{}} className={`${styles.navItem} ${isHomeActive ? styles.active : ""}`}>
                <span className={styles.icon}>
                    <IconHome/>
                </span>
                <span className={styles.label}>Главная</span>
            </Link>

            <Link to="/recipes" search={{}} className={`${styles.navItem} ${isRecipesActive ? styles.active : ""}`}>
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
