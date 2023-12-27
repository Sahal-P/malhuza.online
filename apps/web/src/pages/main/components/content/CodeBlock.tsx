// import { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Clipboard, CopyCheck } from "lucide-react";
import { useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  codeString: string;
  language: string;
}

const CodeBlock = ({ codeString, language }: CodeBlockProps) => {
  // useEffect(() => {
  //   // To dynamically load the language style
  //   import(`react-syntax-highlighter/dist/esm/languages/prism/${language}`).then(() => {
  //     // Do something after the language style is loaded (if needed)
  //   });
  // }, [language]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = useState(codeString);
  const [copy, setCopy] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      // Insert four spaces at the current caret position
      const { selectionStart, selectionEnd } = e.currentTarget;
      const newCode =
        code.substring(0, selectionStart) + "\t" + code.substring(selectionEnd);

      setCode(newCode);

      // Move the caret to the position after the inserted spaces

      const newCaretPosition = selectionStart + 4;
      e.currentTarget.selectionStart = newCaretPosition;
      // textareaRef.current?.setSelectionRange(selectionStart, newCaretPosition)
    }
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 4000);
  };

  return (
    <>
      <div className="max-w-2xl min-w-[300px] m-4 px-2 hover:opacity-70 transition-opacity duration-300 flex justify-between text-white text-xs items-center">
        <p className="text-xs">{capitalizeFirstLetter(language)}</p>
        <button
          className={cn(
            "inline-flex items-center gap-1 ",
            copy && "text-green-500"
          )}
          onClick={onCopyCode}
        >
          {copy ? (
            <CopyCheck className="h-4 w-4 text-green-500" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
          {copy ? "Copied! " : "Copy code"}
        </button>
      </div>
      <div
        role="button"
        tabIndex={0}
        // onKeyDown={() => textareaRef.current?.focus()}
        onClick={() => textareaRef.current?.focus()}
        className="max-w-2xl min-w-[300px] m-4 relative bg-sidebar scrollbar-thin scrollbar-thumb-secondary rounded-md text-md max-sm:text-xs"
      >
        <textarea
          className="absolute inset-0 resize-none bg-transparent p-[10px] font-mono text-transparent caret-white outline-none scrollbar-thin scrollbar-thumb-secondary"
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          wrapLines
          wrapLongLines
          customStyle={{ padding: "10px", background: "transparent" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default CodeBlock;
