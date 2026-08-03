import type {Control, FieldValues, FieldPath} from 'react-hook-form';
import type { BaseFormElemProps } from '@/shared/form-elems/types';

type EditorProps = {
    placeholder?: string;
    disabled?: boolean;
};

type BaseProps = EditorProps & BaseFormElemProps;

export type BaseRichTextEditorProps<T extends FieldValues = FieldValues> =
    | ({
    control: Control<T>;
    name: FieldPath<T>;
    value?: never;
    onChange?: never;
    onBlur?: () => void;
} & BaseProps)
    | ({
    control?: never;
    name?: never;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
} & BaseProps);

export interface RichTextEditorCoreProps extends EditorProps, BaseFormElemProps {
    id: string;
    className?: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
}