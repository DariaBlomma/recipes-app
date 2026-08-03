import type { JSX } from 'react';
import { Controller } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { RichTextEditorCore } from './RichTextEditorCore.tsx';
import type { BaseRichTextEditorProps } from './types.ts';

export function BaseRichTextEditor<T extends FieldValues = FieldValues>(
    props: BaseRichTextEditorProps<T>
): JSX.Element {
    const { control, name, value, onChange, onBlur, ...rest } = props;

    if (control && name) {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => {
                    const normalizedValue = field.value === '<p></p>' ? '' : field.value || '';

                    return (
                        <RichTextEditorCore
                            {...rest}
                            value={normalizedValue}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={fieldState.error?.message ?? rest.error}
                        />
                    );
                }}
            />
        );
    }

    return <RichTextEditorCore
        {...rest} value={value || ''}
        onChange={onChange || (() => {})}
        onBlur={onBlur || (() => {})}
    />;
}