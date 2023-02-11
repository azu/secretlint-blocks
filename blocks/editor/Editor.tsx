import { basicSetup, EditorView } from "codemirror";
import { secretlint } from "./secretlint";
import { lintGutter } from "@codemirror/lint";
import { useEffect, useRef } from "react";

export type EditorProps = {
    value: string;
}
export const Editor = (props: EditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorViewRef = useRef<EditorView>();
    useEffect(() => {
        const editorElement = editorRef.current;
        if (!editorElement) {
            editorViewRef.current?.destroy();
            return;
        }
        editorViewRef.current = new EditorView({
            doc: props.value,
            extensions: [basicSetup, lintGutter(), secretlint],
            parent: editorElement
        });
    }, []);
    return <div ref={editorRef}></div>
}
