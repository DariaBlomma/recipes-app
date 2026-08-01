import React from 'react';
import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
    userName: string;
}

export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
    ({ userName, ...props }, ref) => {
        const initial = userName.charAt(0).toUpperCase();

        return (
            <div
                ref={ref}
                className={styles.avatar}
                {...props}
            >
                {initial}
            </div>
        );
    }
);

UserAvatar.displayName = 'UserAvatar';