import {Outlet, createRootRoute, useRouterState} from '@tanstack/react-router';
import { useAuthCheck } from '@/auth/hooks/useAuthCheck';
import {HeaderNav} from "../shared/widgets/HeaderNav/HeaderNav.tsx";

export const Route = createRootRoute({
    component: RootLayout,
});

function RootLayout() {
    useAuthCheck();
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;
    const isAuthPage = currentPath.startsWith('/auth');
    return (
        <main className="main">
            { !isAuthPage && <HeaderNav />}
            <Outlet />
            { !isAuthPage && <HeaderNav />}
        </main>
    );
}