import {createFileRoute} from '@tanstack/react-router'
import {CategoriesFormView} from "@/categories/views/form/CategoriesFormView.tsx";

export const Route = createFileRoute('/categories/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CategoriesFormView/>
}
