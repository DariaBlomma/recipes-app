import styles from "./CategoriesForm.module.scss"
import {usePersonalCategoriesFormValidation} from "../../hooks/usePersonalCategoriesFormValidation.ts";
import {BaseInput} from "@/shared/form-elems/BaseInput/BaseInput.tsx";
import {useEffect, useState} from "react";
import {CategoriesPersonalService} from "../../services/CategoriesPersonalService.ts";
import {BaseButton} from "@/shared/form-elems/BaseButton/BaseButton.tsx";
import {BaseErrorMessage} from "@/shared/form-elems/BaseErrorMessage/BaseErrorMessage.tsx";
import type {CategoryFormData, CategorySchema} from "@/categories/types";
import {usePersonalCategoriesForm} from "../../hooks/usePersonalCategoriesForm.ts";

interface Props {
    id?: number;
}
export function CategoriesForm({ id }: Props) {
    const { isFormInvalid, fields, handleSubmit, resetForm } = usePersonalCategoriesFormValidation();
    const { submit, isPending, serverError } = usePersonalCategoriesForm();

    const [category, setCategory] = useState<CategorySchema | undefined>();

    useEffect(() => {
        if (id) {
            CategoriesPersonalService.getOne(id).then((data) => {
                if (data) {
                    setCategory(data);
                    resetForm(data);
                }
            });
        }
    }, []);


    const onSubmit = (data: CategoryFormData) => {
        const param = { ...category, ...data, id };
        submit(param as CategoryFormData & { id?: number })
    };

    return (
        <div className={styles.form}>
            <h1 className={styles.title}> { id ? "Редактировать" : "Создать"} категорию</h1>
            <form className={styles.form} noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <BaseInput
                    id="name"
                    label={"Название категории"}
                    placeholder={"Название категории"}
                    type={"text"}
                    required={true}
                    variant="dark"
                    {...fields.name.props}
                />
                {/*todo: for delete, category to move to*/}
                {/*<CategoriesSingleSelectInForm*/}
                {/*    id="categoryId"*/}
                {/*    name="categoryId"*/}
                {/*    categories={categories}*/}
                {/*    placeholder="Выберите категорию"*/}
                {/*    label="Выберите категорию"*/}
                {/*    required={true}*/}
                {/*    control={control}*/}
                {/*    variant="dark"*/}
                {/*/>*/}
                <BaseButton type={"submit"} disabled={isFormInvalid || isPending}>
                    { id ? "Редактировать" : "Создать"}
                </BaseButton>
                {
                    serverError && <BaseErrorMessage error={serverError} />
                }
            </form>
        </div>
    )
}