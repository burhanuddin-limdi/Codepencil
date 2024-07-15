"use client";
import { EditorView, basicSetup } from "codemirror";
import { useLayoutEffect } from "react";
import { EditorState } from "@codemirror/state";
import { ViewPlugin } from "@codemirror/view";
import EditorDropdown from "./EditorDropdown";
import { solarizedDark } from "@/lib/theme";

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
          solarizedDark,
          EditorView.lineWrapping,
        ],
      }),
      parent: codeDiv,
    });
    document.querySelector(`#${displayName}>.cm-editor:nth-child(2)`)?.remove();
  });

  function expand() {
    props.expand(displayName);
  }

  function minimize() {
    props.collapse(displayName);
  }

  return (
    <div className="h-full bg-zinc-700 overflow-y-auto w-full">
      <div className="bg-zinc-900 flex justify-between px-4 py-2 items-center">
        <p className="text-white uppercase font-bold">{displayName}</p>
        <EditorDropdown onExpand={expand} onMinimize={minimize} />
      </div>
      <div id={displayName} className="w-full flex-grow h-full"></div>
    </div>
  );
};
