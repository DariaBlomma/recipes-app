import { useFormWithValidation } from "@/shared/hooks/useFormWithValidation.ts";
import type { ResetPasswordFormData } from "@/auth/types";

export function useResetPasswordForm() {
    const { getFields, isFormInvalid, isFormValidAndTouched, validateForm, form, handleSubmit } =
        useFormWithValidation<ResetPasswordFormData>({
            initialValues: {
                newPassword: '',
                confirmPassword: '',
            },
            validationSchema: {
                newPassword: {
                    required: 'Обязательное поле',
                    minLength: { value: 6, message: 'Минимум 6 символов' },
                },
                confirmPassword: {
                    required: 'Обязательное поле',
                    validate: (value, formValues) =>
                        value === formValues.newPassword || 'Пароли не совпадают',
                },
            },
        });

    const fields = getFields();

    return {
        form,
        fields,
        isFormInvalid,
        isFormValidAndTouched,
        validateForm,
        handleSubmit,
    };
}