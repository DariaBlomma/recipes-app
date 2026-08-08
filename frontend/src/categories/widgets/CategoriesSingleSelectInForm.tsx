import type { CategorySchema } from '@/categories/types';
import { BaseFormElemLayout } from "@/shared/form-elems/BaseFormElemLayout/BaseFormElemLayout.tsx";
import { type  Control, Controller, type FieldValues, type  Path, type RegisterOptions } from "react-hook-form";
import type {BaseFormElemProps} from "@/shared/form-elems/types";
import {CategoriesSingleSelect} from "@/categories/widgets/CategoriesSingleSelect.tsx";

interface Props<T extends FieldValues> extends BaseFormElemProps{
    name: Path<T>;
    categories: CategorySchema[];
    placeholder?: string;
    isLoading?: boolean;
    className?: string;
    control: Control<T>;
    rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
}

export function CategoriesSingleSelectInForm<T extends FieldValues>({
  id,
  label,
  name,
  placeholder = 'Выберите категорию',
  required,
  categories,
  isLoading = false,
  className,
  control,
  rules,
    variant
}: Props<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                return (
                    <BaseFormElemLayout
                        id={id}
                        label={label}
                        required={required}
                        error={fieldState.error?.message}
                        variant={variant}
                    >
                        <CategoriesSingleSelect
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            categories={categories}
                            placeholder={placeholder}
                            isLoading={isLoading}
                            className={className}
                        />
                    </BaseFormElemLayout>
                );
            }}
        />
    );
}
