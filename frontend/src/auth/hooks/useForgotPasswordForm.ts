import { useFormWithValidation } from "@/shared/hooks/useFormWithValidation.ts";
import type { ForgotPasswordFormData } from "@/auth/types";

export function useForgotPasswordForm() {
    const { getFields, isFormInvalid, isFormValidAndTouched, validateForm, form, handleSubmit } =
        useFormWithValidation<ForgotPasswordFormData>({
            initialValues: {
                email: '',
            },
            validationSchema: {
                email: {
                    required: 'Обязательное поле',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Неверный формат email',
                    },
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