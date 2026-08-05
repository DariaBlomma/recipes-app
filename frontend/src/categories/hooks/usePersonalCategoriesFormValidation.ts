import { useFormWithValidation } from "@/shared/hooks/useFormWithValidation.ts";
import type {CategoryFormData} from "@/categories/types";

export function usePersonalCategoriesFormValidation() {
    const {
        getFields,
        isFormInvalid,
        isFormValidAndTouched,
        validateForm,
        form,
        handleSubmit,
        control,
        resetForm
    } = useFormWithValidation<CategoryFormData>({
        initialValues: {
            name: '',
        },
        validationSchema: {
            name: {
                required: 'Название категории обязательно',
                minLength: { value: 2, message: 'Минимум 2 символа' },
                maxLength: { value: 200, message: 'Максимум 200 символов' },
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
        control,
        resetForm,
    };
}
