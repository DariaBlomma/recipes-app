import {createFileRoute, useParams} from '@tanstack/react-router'
import {RecipesFormView} from "@/recipes/views/form/RecipesFormView.tsx";

export const Route = createFileRoute('/recipes/edit/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = useParams({ from: '/recipes/edit/$id' })

    const numberId = id ? parseInt(id) : undefined;
    return <RecipesFormView id={numberId} />
}
