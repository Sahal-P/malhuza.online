import { FC, useEffect } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import content from './TestContent'
import { useEditorTheme, useTheme } from "@/components/common/ThemeProvider";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: FC<EditorProps> = ({ onChange, initialContent, editable }) => {

    const {theme} = useTheme()
    const {lightTheme, darkTheme, systemTheme} = useEditorTheme()

const handleUpload = (file: File) => {
    const upload = new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          resolve("https://s3.eu-north-1.amazonaws.com/async-await.online/media/images/malhuza/jwt_middleware_2%20%282%29%20%281%29.png");
        }, 300);
      });
    return upload
}


  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
  });
  useEffect(() => {}, []);
  return (
    // <div>
      <BlockNoteView className="dark:bg-document_bg" editor={editor} theme={theme === "dark" && darkTheme || theme === "light" && lightTheme || systemTheme} />
    // </div>
  );
};

export default Editor;
