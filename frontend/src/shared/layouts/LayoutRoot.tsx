import {Outlet, useRouterState} from "@tanstack/react-router";
import {TheHeader} from "@/header/widgets/TheHeader/TheHeader.tsx";
import {HeaderNav} from "@/header/widgets/HeaderNav/HeaderNav.tsx";

export function LayoutRoot() {
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