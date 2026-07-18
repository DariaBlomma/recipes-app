import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
    userName: string;
}
export const UserAvatar = ({ userName }: UserAvatarProps) => {
    return (
        <div className={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
    )
}