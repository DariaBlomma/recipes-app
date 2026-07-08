import Select from 'react-select';
import type { BaseSelectOption } from '@/shared/types';
import type { CategorySchema } from '@/categories/types';

interface CategoriesSingleSelectProps {
    value: number | undefined;
    onChange: (id: number | undefined) => void;
    categories: CategorySchema[];
    placeholder?: string;
    isLoading?: boolean;
    className?: string;
}

export function CategoriesSingleSelect({
       value,
       onChange,
       categories,
       placeholder = 'Выберите категорию',
       isLoading = false,
       className,
   }: CategoriesSingleSelectProps) {
    const options: BaseSelectOption[] = categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));

    const selectedOption: BaseSelectOption | undefined = options.find(
        (opt) => opt.value === value
    );

    const handleChange = (selected: BaseSelectOption | null): void => {
        onChange(selected?.value);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder={placeholder}
            isLoading={isLoading}
            className={className}
            isMulti={false}
            isClearable={true}
        />
    );
}
