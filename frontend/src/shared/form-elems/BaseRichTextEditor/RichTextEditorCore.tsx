import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useEffect } from 'react';
import { ToolbarButton } from './ToolbarButton.tsx';
import type { RichTextEditorCoreProps } from './types.ts';
import styles from './BaseRichTextEditor.module.scss';
import {BaseFormElemLayout} from "@/shared/form-elems/BaseFormElemLayout/BaseFormElemLayout.tsx";

export function RichTextEditorCore({
   id,
   value,
   onChange,
   onBlur,
   placeholder,
   disabled,
   className,
   label,
   required,
   error,
   variant,
}: RichTextEditorCoreProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                codeBlock: false,
                blockquote: false,
                horizontalRule: false,
            }),
            Underline,
        ],
        content: value || '',
        editable: !disabled,
        editorProps: {
            attributes: {
                class: styles.editor,
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            const param = html === '<p></p>' ? '' : html
            onChange(param);
        },
        onBlur: () => {
            onBlur?.();
        },
    });

    useEffect(() => {
        if (!editor) return;
        const currentHtml = editor.getHTML();
        if (currentHtml !== value && value !== (currentHtml === '<p></p>' ? '' : currentHtml)) {
            editor.commands.setContent(value || '');
        }
    }, [value, editor]);

    useEffect(() => {
        if (editor) {
            editor.setEditable(!disabled);
        }
    }, [disabled, editor]);

    if (!editor) return null;

    const mergedClassName = [
        'base-rich-text-editor',
        styles.wrapper,
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <BaseFormElemLayout
            id={id}
            label={label}
            required={required}
            error={error}
            variant={variant}
        >
            <div className={mergedClassName}>
                <div className={styles.container}>
                    <div className={styles.toolbar}>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            active={editor.isActive('bold')}
                            title="Жирный"
                        >
                            <b>B</b>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            active={editor.isActive('italic')}
                            title="Курсив"
                        >
                            <i>I</i>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            active={editor.isActive('underline')}
                            title="Подчёркнутый"
                        >
                            <u>U</u>
                        </ToolbarButton>
                        <div className={styles.divider} />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            active={editor.isActive('bulletList')}
                            title="Маркированный список"
                        >
                            • Список
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            active={editor.isActive('orderedList')}
                            title="Нумерованный список"
                        >
                            1. Список
                        </ToolbarButton>
                        <div className={styles.divider} />
                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            title="Отменить"
                        >
                            ↶
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            title="Повторить"
                        >
                            ↷
                        </ToolbarButton>
                    </div>
                    <EditorContent editor={editor} className={styles.content} />
                    {placeholder && !editor.getText() && (
                        <div className={styles.placeholder}>{placeholder}</div>
                    )}
                </div>
            </div>
        </BaseFormElemLayout>
    );
}