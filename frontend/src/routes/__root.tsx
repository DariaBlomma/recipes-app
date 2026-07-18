import {Outlet, createRootRoute, useRouterState} from '@tanstack/react-router';
import { useAuthCheck } from '@/auth/hooks/useAuthCheck';
import {HeaderNav} from "../header/widgets/HeaderNav/HeaderNav.tsx";
import {TheHeader} from "@/header/widgets/TheHeader/TheHeader.tsx";

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
            { !isAuthPage && (
                    <>
                        <TheHeader/>
                        <HeaderNav/>
                    </>
                )
            }
            <Outlet />
            { !isAuthPage && <HeaderNav />}
        </main>
    );
}