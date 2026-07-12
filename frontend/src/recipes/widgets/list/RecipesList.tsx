import { RecipesCard } from "@/recipes/widgets/card/RecipesCard.tsx";
import styles from "./RecipesList.module.scss";
import type {RecipeSchema} from "@/recipes/types";
import InfiniteScroll from "react-infinite-scroll-component";
import {clsx} from "clsx";

interface Props {
    recipes: RecipeSchema[];
    hasNextPage: boolean;
    loadMore: () => void;
    isFetchingNextPage: boolean;
    filterCategoryId?: number;
}
export const RecipesList = ({
    recipes,
    hasNextPage,
    loadMore,
    isFetchingNextPage,
    filterCategoryId,
}: Props) => {
    if (!recipes.length && !hasNextPage) {
        return <div className={styles.empty}>В этой категории пока нет рецептов</div>;
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={recipes.length}
                next={loadMore}
                hasMore={hasNextPage}
                loader={
                    <div className={styles.loader} style={{ textAlign: 'center', marginTop: 16 }}>
                        {isFetchingNextPage ? 'Загружаем ещё рецепты…' : 'Почти всё'}
                    </div>
                }
                scrollThreshold={0.5}
                className={clsx("base-list", styles.list)}
            >
                {recipes.map((recipe) => (
                    <RecipesCard
                        key={recipe.id}
                        {...recipe}
                        filterCategoryId={filterCategoryId}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};