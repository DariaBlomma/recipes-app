import {createFileRoute} from '@tanstack/react-router'
import {RecipesFormView} from "@/recipes/views/form/RecipesFormView.tsx";

export const Route = createFileRoute('/recipes/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <RecipesFormView/>
}
