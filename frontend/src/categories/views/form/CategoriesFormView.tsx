import {CategoriesForm} from "@/categories/widgets/form/CategoriesForm.tsx";

export function CategoriesFormView({ id}: { id?: number }   ) {
    return (
        <CategoriesForm id={id} />
    )
}