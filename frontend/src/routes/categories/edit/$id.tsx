import {createFileRoute, useParams} from '@tanstack/react-router'
import {CategoriesFormView} from "@/categories/views/form/CategoriesFormView.tsx";

export const Route = createFileRoute('/categories/edit/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = useParams({ from: '/categories/edit/$id' })

    const numberId = id ? parseInt(id) : undefined;
    return <CategoriesFormView id={numberId} />
}
