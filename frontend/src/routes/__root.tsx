import {Outlet, createRootRoute, useRouterState} from '@tanstack/react-router';
import { useAuthCheck } from '@/auth/hooks/useAuthCheck';
import {NavBottom} from "@/shared/widgets/NavBottom/NavBottom.tsx";

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    useAuthCheck();
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;
    const isAuthPage = currentPath.startsWith('/auth');
    return (
        <main>
            <Outlet />
            { !isAuthPage && <NavBottom />}
        </main>
    );
}