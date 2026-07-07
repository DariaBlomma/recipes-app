import { RecipesCard } from "@/recipes/widgets/card/RecipesCard.tsx";
import styles from "./RecipesList.module.scss";
import type {RecipeSchema} from "@/recipes/types";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
    recipes: RecipeSchema[];
    hasNextPage: boolean;
    loadMore: () => void;
    isFetchingNextPage: boolean;
}
export const RecipesList = ({
    recipes,
    hasNextPage,
    loadMore,
    isFetchingNextPage,
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
                className={styles.list}
            >
                {recipes.map((recipe) => (
                    <RecipesCard
                        key={recipe.id}
                        {...recipe}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};