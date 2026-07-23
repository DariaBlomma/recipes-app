import styles from './TheHeader.module.scss';
import {UserAvatar} from "@/user/UserAvatar/UserAvatar.tsx";
import {IconLogo} from "@/shared/icons/IconLogo.tsx";
import {useEffect, useState} from "react";
import type {UserSchema} from "@/user/types";
import {UserService} from "@/user/service/UserService.ts";
import {UserProfileDropdown} from "@/user/widgets/UserProfileDropdown/UserProfileDropdown.tsx";

export const TheHeader = () => {
    const [currentUser, setCurrentUser] = useState<UserSchema | undefined>();

    useEffect(() => {
        UserService.getMe().then((data) => setCurrentUser(data));
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <IconLogo size={36} />
            </div>

            {
                currentUser && (
                    <div className={styles.userBlock}>
                        <UserProfileDropdown>
                            <UserAvatar userName={currentUser.userName} />
                        </UserProfileDropdown>
                    </div>
                )
            }
        </header>
    );
}
