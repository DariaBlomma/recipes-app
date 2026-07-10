import {createFileRoute} from '@tanstack/react-router'
import {CategoriesListView} from "@/categories/views/CategoriesListView/CategoriesListView.tsx";

export const Route = createFileRoute('/categories/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <CategoriesListView/>
    )
}
