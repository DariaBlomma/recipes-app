import { createFileRoute } from '@tanstack/react-router';;
import {HomePage} from "@/shared/widgets/HomePage/HomePage.tsx";

export const Route = createFileRoute('/')({
    component: HomePage,
});
