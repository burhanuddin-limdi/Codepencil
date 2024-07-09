"use client";
import { EditorView, basicSetup } from "codemirror";
import { useLayoutEffect } from "react";
import { EditorState } from "@codemirror/state";
import { ViewPlugin } from "@codemirror/view";

interface Props {
  language: Function;
  displayName: string;
  value: string;
  onChange: Function;
  expand: (codeId: string) => void;
  collapse: (codeId: string) => void;
}
export const CodeEditor: React.FC<Props> = (props: Props) => {
  let { language, displayName, value, onChange } = props;
  useLayoutEffect(() => {
    const codeDiv: any = document.querySelector(`#${displayName}`);
    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          ViewPlugin.fromClass(
            class {
              constructor(view: any) {}

              update(update: any) {
                if (update.docChanged) {
                  const code = update.state.doc.text.join("\n");
                  onChange(code);
                }
              }
            }
          ),
          basicSetup,
          language(),
          EditorView.lineWrapping,
        ],
      }),
      parent: codeDiv,
    });
    document.querySelector(`#${displayName}>.cm-editor:nth-child(2)`)?.remove();
  });
  return (
    <div className="h-full bg-[#002b36] overflow-y-auto w-full border-b border-[#2aa198]">
      <div className="bg-zinc-900 flex justify-between px-4 py-2">
        <p className="text-white uppercase font-bold">{displayName}</p>
        <div className="flex gap-2">
          <button
            className="text-white border rounded-md px-2"
            onClick={() => props.expand(displayName)}
          >
            Expand
          </button>
          <button
            className="text-white border rounded-md px-2"
            onClick={() => props.collapse(displayName)}
          >
            Minimize
          </button>
        </div>
      </div>
      <div id={displayName} className="w-full flex-grow h-full"></div>
    </div>
  );
};
