"use client";
import { useLayoutEffect } from "react";
import { solarizedDark } from "@/lib/theme";
import { ViewPlugin } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";

interface Props {
  language: Function;
  displayName: string;
  value: string;
  onChange: Function;
}
export const MobileCodeEditor: React.FC<Props> = (props: Props) => {
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

  return (
    <div className="h-full bg-zinc-700 overflow-y-auto w-full">
      <div
        id={displayName}
        className="w-full flex-grow h-full overflow-y-auto"
      ></div>
    </div>
  );
};

export default MobileCodeEditor;
