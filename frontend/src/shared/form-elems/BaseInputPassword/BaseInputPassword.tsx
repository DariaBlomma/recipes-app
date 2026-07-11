import { useState, type JSX } from 'react';
import { BaseInput } from '../BaseInput/BaseInput';
import styles from './BaseInputPassword.module.scss';
import type {BaseInputProps} from "@/shared/form-elems/types";
import { IconEye} from "@/shared/icons/IconEye.tsx";
import { IconEyeClosed } from "@/shared/icons/IconEyeClosed.tsx";

export function BaseInputPassword({ label, ...inputProps }: BaseInputProps): JSX.Element {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={styles.wrapper}>
            <BaseInput
                label={label}
                type={showPassword ? 'text' : 'password'}
                {...inputProps}
            >
                <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={toggleVisibility}
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    tabIndex={-1}
                >
                    {showPassword ? <IconEyeClosed/> : <IconEye/> }
                </button>
            </BaseInput>
        </div>
    );
}