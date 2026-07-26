import styles from './UserProfileDropdown.module.scss';
import * as Radix from '@radix-ui/react-dropdown-menu';
import {AuthService} from "@/auth/services/AuthService.ts";
import {useNavigate} from "@tanstack/react-router";

interface Props {
    children?: React.ReactNode;
}

export const UserProfileDropdown = ({ children }: Props) => {
    const navigate = useNavigate();
    const onLogout = async () => {
        await AuthService.signOut();
        navigate({ to: "/auth/login"})
    }
    return (
        <Radix.DropdownMenu>
            <Radix.DropdownMenuTrigger asChild>
                { children }
            </Radix.DropdownMenuTrigger>

            <Radix.DropdownMenuContent
                align="end"
                className={styles.dropdownContent}
            >
                <Radix.DropdownMenuItem
                    onClick={onLogout}
                    className={styles.dropdownItem}
                >
                    Выйти
                </Radix.DropdownMenuItem>
            </Radix.DropdownMenuContent>
        </Radix.DropdownMenu>
    );
};
