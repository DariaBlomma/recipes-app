import styles from "./RecipesForm.module.scss"
import {Link} from "@tanstack/react-router";
import {useRecipesFormValidation} from "../../hooks/useRecipesFormValidation.ts";
import type {RecipeFormData, RecipeSchema} from "@/recipes/types";
import {BaseInput} from "@/shared/form-elems/BaseInput/BaseInput.tsx";
import {BaseTextarea} from "@/shared/form-elems/BaseTextarea/BaseTextarea.tsx";
import {CategoriesSingleSelectInForm} from "@/categories/widgets/CategoriesSingleSelectInForm.tsx";
import {useEffect, useState} from "react";
import type {CategorySchema} from "@/categories/types";
import {CategoriesService} from "@/categories/services/CategoriesService.ts";
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import {RecipesService} from "@/recipes/services/RecipesService.ts";
import {useRecipesForm} from "@/recipes/hooks/useRecipesForm.ts";
import {BaseErrorMessage} from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";

interface Props {
    id?: number;
}
export function RecipesForm({ id }: Props) {
    const { isFormInvalid, fields, handleSubmit, control, resetForm } = useRecipesFormValidation();
    const { submit, isPending, serverError } = useRecipesForm();

    const [categories, setCategories] = useState<CategorySchema[]>([]);
    const [recipe, setRecipe] = useState<RecipeSchema | undefined>();

    useEffect(() => {
        CategoriesService.getList().then((data) => setCategories(data));
        if (id) {
            RecipesService.getOne(id).then((data) => {
                if (data) {
                    setRecipe(data);
                    resetForm(data);
                }
            });
        }
    }, []);


    const onSubmit = (data: RecipeFormData) => {
        const param = { ...recipe, ...data, id };
        submit(param as Required<RecipeFormData> & { id?: number})
    };

    return (
        <div className={styles.form}>
            <h1 className={styles.title}> { id ? "Редактировать" : "Создать"} рецепт</h1>
            <form className={styles.form} noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <BaseInput
                    id="name"
                    label={"Название рецепта"}
                    placeholder={"Название рецепта"}
                    type={"text"}
                    required={true}
                    variant="dark"
                    {...fields.name.props}
                />
                <BaseInput
                    id="url"
                    label={"Ссылка на сайт с рецептом"}
                    placeholder={"URL (например, https://example.com)"}
                    type={"text"}
                    required={false}
                    variant="dark"
                    {...fields.externalLink.props}
                />
                <BaseTextarea
                    id="description"
                    label={"Описание рецепта"}
                    placeholder={"Описание рецепта"}
                    required={false}
                    variant="dark"
                    {...fields.description.props}
                />
                <CategoriesSingleSelectInForm
                    id="categoryId"
                    name="categoryId"
                    categories={categories}
                    placeholder="Выберите категорию"
                    label="Выберите категорию"
                    required={true}
                    control={control}
                    variant="dark"
                />
                <BaseButton type={"submit"} disabled={isFormInvalid || isPending}>
                    { id ? "Редактировать" : "Создать"}
                </BaseButton>
                {
                    serverError && <BaseErrorMessage error={serverError} />
                }
            </form>
            <Link to="/recipes">К списку рецептов</Link>
        </div>
    )
}