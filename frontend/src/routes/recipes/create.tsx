import {createFileRoute} from '@tanstack/react-router'
import {RecipesForm} from "@/recipes/widgets/form/RecipesForm.tsx";

export const Route = createFileRoute('/recipes/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <RecipesForm />
        </div>
    )
}
