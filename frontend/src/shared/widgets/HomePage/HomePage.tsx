import styles from "./HomePage.module.scss"
import {Link} from "@tanstack/react-router";

export function HomePage() {
    return (
        <main className={styles.homePage}>
            <h1 className={styles.title}>Твоя электронная записная книжка рецептов</h1>

            <p className={styles.description}>
                Здесь ты можешь хранить свои любимые рецепты, сортировать их по категориям и возвращаться к ним в любой момент.
            </p>

            <section className={styles.howto}>
                <h3 className={styles.howtoTitle}>С чего начать</h3>
                <ol className={styles.list}>
                    <li className={styles.listItem}>
                        Сначала создай категории — например, «Первые блюда», «Вторые блюда», «Десерты».
                    </li>
                    <li className={styles.listItem}>
                        Затем добавляй в них рецепты — с ингредиентами, шагами приготовления и фото.
                    </li>
                </ol>
            </section>

            <div className={styles.actions}>
                <Link to="/categories/create" className={styles.btn}>
                    Создать категорию
                </Link>
                <Link to="/recipes/create" className={styles.btnSecondary}>
                    Добавить рецепт
                </Link>
            </div>
        </main>
    );
}