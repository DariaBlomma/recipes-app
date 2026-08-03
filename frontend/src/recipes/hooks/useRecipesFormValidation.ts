import { useFormWithValidation } from "@/shared/hooks/useFormWithValidation.ts";
import type { RecipeFormData } from "@/recipes/types";

export function useRecipesFormValidation() {
    const {
        getFields,
        isFormInvalid,
        isFormValidAndTouched,
        validateForm,
        form,
        handleSubmit,
        control,
        resetForm,
    } = useFormWithValidation<RecipeFormData>({
        initialValues: {
            name: '',
            shortDescription: '',
            description: '',
            externalLink: '',
            categoryId: undefined,
        },
        validationSchema: {
            name: {
                required: 'Название рецепта обязательно',
                minLength: { value: 2, message: 'Минимум 2 символа' },
                maxLength: { value: 200, message: 'Максимум 200 символов' },
            },

            categoryId: {
                required: 'Пожалуйста, выберите категорию',
            },

            externalLink: {
                pattern: {
                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i,
                    message: 'Некорректный формат URL',
                },
                maxLength: { value: 500, message: 'Ссылка слишком длинная' },
            },

            description: {
                required: "Обязательное поле",
                maxLength: { value: 2000, message: 'Описание слишком длинное' },
            },

            shortDescription: {
                maxLength: { value: 150, message: 'Краткое описание слишком длинное' },
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
