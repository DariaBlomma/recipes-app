import styles from "./HomePage.module.scss"
import {useNavigate} from "@tanstack/react-router";
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";

export function HomePage() {
    const navigate = useNavigate();

    const onCreateRecipe = () => {
        navigate({ to: "/recipes/create"})
    }

    return (
        <main className={styles.homePage}>
            <h1 className={styles.title}>Твоя электронная записная книжка рецептов</h1>

            <p className={styles.description}>
                Здесь ты можешь хранить свои любимые рецепты, фильтровать их по категориям и возвращаться к ним в любой момент.
            </p>

            <section className={styles.howto}>
                <h3 className={styles.howtoTitle}>С чего начать</h3>
                <ol className={styles.list}>
                    <li className={styles.listItem}>
                        Добавь рецепт — с ингредиентами, шагами приготовления и фото.
                    </li>
                    <li className={styles.listItem}>
                        Если стандартных категорий недостаточно, создай свои — например, «Меню на неделю», «Блюда из кабачков», «Поделиться».
                    </li>
                </ol>
            </section>

            <div className={styles.actions}>
                <BaseButton onClick={onCreateRecipe}>
                    Добавить рецепт
                </BaseButton>
            </div>
        </main>
    );
}