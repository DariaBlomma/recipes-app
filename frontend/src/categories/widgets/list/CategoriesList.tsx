import styles from "./CategoriesList.module.scss";
import type {CategorySchema} from "@/categories/types";
import {CategoriesCard} from "@/categories/widgets/card/CategoriesCard.tsx";
import {clsx} from "clsx";

interface Props {
    categories: CategorySchema[];
}
export const CategoriesList = ({
    categories,
}: Props) => {
    if (!categories.length) {
        return <div className={styles.empty}>Категорий пока нет</div>;
    }

    return (
        <div className={clsx("base-list", styles.list)}>
            {categories.map((item) => (
                <CategoriesCard
                    key={item.id}
                    {...item}
                />
            ))}
        </div>
    );
};