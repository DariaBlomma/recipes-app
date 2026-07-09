import {RecipesForm} from "@/recipes/widgets/form/RecipesForm.tsx";

export function RecipesFormView({ id}: { id?: number }   ) {
    return (
        <div>
            <RecipesForm id={id} />
        </div>
    )
}