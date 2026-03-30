import type { ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Link2 } from "lucide-react";

export interface BlogEditorProps {
  /** Remount editor when this changes (e.g. blog id after load). */
  mountKey: string;
  initialHtml: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function BlogEditor({ mountKey, initialHtml, onChange, placeholder }: BlogEditorProps) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
        }),
        Placeholder.configure({
          placeholder: placeholder ?? "Write your article…",
        }),
        Link.configure({
          openOnClick: false,
          autolink: true,
          HTMLAttributes: {
            rel: "noopener noreferrer",
            class: "text-[#1A73E8] underline",
          },
        }),
      ],
      content: initialHtml || "",
      editorProps: {
        attributes: {
          class: "blog-editor-content min-h-[280px] px-3 py-2 text-sm text-[#202124] focus:outline-none",
        },
      },
      onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
      immediatelyRender: false,
    },
    [mountKey]
  );

  if (!editor) {
    return (
      <div className="min-h-[280px] rounded border border-[#DADCE0] bg-[#F8F9FA] animate-pulse" aria-hidden />
    );
  }

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (https://…)", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const Btn = ({
    onClick,
    active,
    children,
    label,
  }: {
    onClick: () => void;
    active?: boolean;
    children: ReactNode;
    label: string;
  }) => (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`p-1.5 rounded transition-colors ${
        active ? "bg-[#E8F0FE] text-[#1A73E8]" : "text-[#5F6368] hover:bg-[#F1F3F4]"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-lg border border-[#DADCE0] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#1A73E8]/20 focus-within:border-[#1A73E8]">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#DADCE0] bg-[#F8F9FA]">
        <Btn
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="w-4 h-4" />
        </Btn>
        <Btn
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="w-4 h-4" />
        </Btn>
        <span className="w-px h-5 bg-[#DADCE0] mx-1" />
        <Btn label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Btn>
        <span className="w-px h-5 bg-[#DADCE0] mx-1" />
        <Btn
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </Btn>
        <Btn
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Btn>
        <span className="w-px h-5 bg-[#DADCE0] mx-1" />
        <Btn label="Link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 className="w-4 h-4" />
        </Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
