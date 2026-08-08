import Select from 'react-select';
import type { BaseSelectOption } from '@/shared/types';
import type { CategorySchema } from '@/categories/types';

interface CategoriesMultiSelectProps {
    value: number[] | undefined;
    onChange: (ids: number[] | undefined) => void;
    onBlur?: () => void;
    categories: CategorySchema[];
    placeholder?: string;
    isLoading?: boolean;
    className?: string;
}

export function CategoriesMultiSelect({
  value,
  onChange,
  onBlur,
  categories,
  placeholder = 'Выберите категории',
  isLoading = false,
  className,
}: CategoriesMultiSelectProps) {
    const options: BaseSelectOption[] = categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));

    const selectedOptions = options.filter((opt) => value?.includes(opt.value));

    const handleChange = (selected: readonly BaseSelectOption[]): void => {
        onChange(selected.length ? selected.map((opt) => opt.value) : undefined);
    };

    return (
        <Select
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            onBlur={onBlur}
            options={options}
            placeholder={placeholder}
            isLoading={isLoading}
            className={className}
            isClearable={true}
        />
    );
}