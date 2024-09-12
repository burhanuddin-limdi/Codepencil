import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { useRef, useState, useEffect, FunctionComponent } from "react";
import {
  Panel,
  PanelGroup,
  ImperativePanelHandle,
  PanelResizeHandle,
} from "react-resizable-panels";
import { CodeEditor } from "./CodeEditor";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeSize } from "@/store/features/editor-size.slice";

interface EditorLayoutProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  sethtml: (htmlCode: string) => void;
  setcss: (cssCode: string) => void;
  setjs: (jsCode: string) => void;
  srcDoc: string;
  setSrcDoc: (srcDoc: string) => void;
}

const EditorLayout: FunctionComponent<EditorLayoutProps> = ({
  htmlCode,
  cssCode,
  jsCode,
  sethtml,
  setcss,
  setjs,
  setSrcDoc,
  srcDoc,
}: EditorLayoutProps) => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(
    (state) => state.editorLayoutSlice.value.layoutType
  );
  const editorSize = useAppSelector(
    (state) => state.editorSizeSlice.value.layoutType
  );

  const htmlDisplayName = "html";
  const cssDisplayName = "css";
  const jsDisplayName = "js";

  const htmlRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const cssRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const jsRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const editorsRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const outputRef: React.RefObject<ImperativePanelHandle> = useRef(null);

  function onExpand(id: string) {
    if (id === htmlDisplayName) {
      htmlRef.current?.resize(100);
      cssRef.current?.resize(0);
      jsRef.current?.resize(0);
    } else if (id === cssDisplayName) {
      htmlRef.current?.resize(0);
      cssRef.current?.resize(100);
      jsRef.current?.resize(0);
    } else if (id === jsDisplayName) {
      htmlRef.current?.resize(0);
      cssRef.current?.resize(0);
      jsRef.current?.resize(100);
    }
  }

  function onCollapse(id: string) {
    if (id === htmlDisplayName) {
      htmlRef.current?.resize(0);
      cssRef.current?.resize(50);
      jsRef.current?.resize(50);
    } else if (id === cssDisplayName) {
      htmlRef.current?.resize(50);
      cssRef.current?.resize(0);
      jsRef.current?.resize(50);
    } else if (id === jsDisplayName) {
      htmlRef.current?.resize(50);
      cssRef.current?.resize(550);
      jsRef.current?.resize(0);
    }
  }

  useEffect(() => {
    switch (editorSize) {
      case "e":
        editorsRef.current?.resize(100);
        outputRef.current?.resize(0);
        break;
      case "o":
        editorsRef.current?.resize(0);
        outputRef.current?.resize(100);
        break;
      case "r":
        editorsRef.current?.resize(50);
        outputRef.current?.resize(50);
        cssRef.current?.resize(33);
        htmlRef.current?.resize(33);
        jsRef.current?.resize(33);
        break;
      default:
        break;
    }
  }, [editorSize]);

  useEffect(() => {
    setSrcDoc(`
        <html>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
        </html>
      `);
  }, [htmlCode, cssCode, jsCode]);

  const output = (
    <Panel defaultSize={50} collapsible={true} ref={outputRef}>
      <iframe
        className="w-full h-full"
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
      />
    </Panel>
  );
  const editors = (
    <Panel defaultSize={50} collapsible={true} ref={editorsRef}>
      <div className="w-screen h-full">
        <PanelGroup
          autoSaveId="editor"
          direction={layout == "t" ? "horizontal" : "vertical"}
        >
          <Panel ref={htmlRef}>
            <CodeEditor
              collapse={onCollapse}
              expand={onExpand}
              language={html}
              displayName={htmlDisplayName}
              value={htmlCode}
              onChange={sethtml}
            />
          </Panel>
          <PanelResizeHandle
            className={cn(
              "bg-black",
              layout == "t"
                ? "w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
                : "h-3 border-t-[0.5px] border-b-[0.5px] border-zinc-500"
            )}
            onMouseDown={() => dispatch(changeSize("c"))}
          />
          <Panel ref={cssRef}>
            <CodeEditor
              collapse={onCollapse}
              expand={onExpand}
              language={css}
              displayName={cssDisplayName}
              value={cssCode}
              onChange={setcss}
            />
          </Panel>
          <PanelResizeHandle
            className={cn(
              "bg-black",
              layout == "t"
                ? "w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
                : "h-3 border-t-[0.5px] border-b-[0.5px] border-zinc-500"
            )}
            onChange={() => dispatch(changeSize("c"))}
          />
          <Panel ref={jsRef}>
            <CodeEditor
              collapse={onCollapse}
              expand={onExpand}
              language={javascript}
              displayName={jsDisplayName}
              value={jsCode}
              onChange={setjs}
            />
          </Panel>
        </PanelGroup>
      </div>
    </Panel>
  );
  return (
    <div className="h-[calc(100vh-64px)]">
      <PanelGroup direction={layout == "t" ? "vertical" : "horizontal"}>
        {(layout == "r" || layout == "t") && (
          <>
            {editors}{" "}
            <PanelResizeHandle
              className={cn(
                "bg-black",
                layout == "t"
                  ? "h-3 border-t-[0.5px] border-b-[0.5px] border-zinc-500"
                  : "w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
              )}
              onChange={() => dispatch(changeSize("c"))}
            />{" "}
            {output}
          </>
        )}
        {layout == "l" && (
          <>
            {output}{" "}
            <PanelResizeHandle
              className={cn(
                "bg-black w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
              )}
              onChange={() => dispatch(changeSize("c"))}
            />{" "}
            {editors}
          </>
        )}
      </PanelGroup>
    </div>
  );
};

export default EditorLayout;

/*


interface EditorLayoutProps{

}

export const EditorLayout = forwardRef(() => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(
    (state) => state.editorLayoutSlice.value.layoutType
  );
  const editorSize = useAppSelector(
    (state) => state.editorSizeSlice.value.layoutType
  );
  const [htmlCode, sethtml] = useLocalStorage("html", "");
  const [cssCode, setcss] = useLocalStorage("css", "");
  const [jsCode, setjs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  const htmlDisplayName = "html";
  const cssDisplayName = "css";
  const jsDisplayName = "js";

  const htmlRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const cssRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const jsRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const editorsRef: React.RefObject<ImperativePanelHandle> = useRef(null);
  const outputRef: React.RefObject<ImperativePanelHandle> = useRef(null);

  function onExpand(id: string) {
    if (id === htmlDisplayName) {
      htmlRef.current?.resize(100);
      cssRef.current?.resize(0);
      jsRef.current?.resize(0);
    } else if (id === cssDisplayName) {
      htmlRef.current?.resize(0);
      cssRef.current?.resize(100);
      jsRef.current?.resize(0);
    } else if (id === jsDisplayName) {
      htmlRef.current?.resize(0);
      cssRef.current?.resize(0);
      jsRef.current?.resize(100);
    }
  }

  function onCollapse(id: string) {
    if (id === htmlDisplayName) {
      htmlRef.current?.resize(0);
      cssRef.current?.resize(50);
      jsRef.current?.resize(50);
    } else if (id === cssDisplayName) {
      htmlRef.current?.resize(50);
      cssRef.current?.resize(0);
      jsRef.current?.resize(50);
    } else if (id === jsDisplayName) {
      htmlRef.current?.resize(50);
      cssRef.current?.resize(550);
      jsRef.current?.resize(0);
    }
  }

  useEffect(() => {
    switch (editorSize) {
      case "e":
        editorsRef.current?.resize(100);
        outputRef.current?.resize(0);
        break;
      case "o":
        editorsRef.current?.resize(0);
        outputRef.current?.resize(100);
        break;
      case "r":
        editorsRef.current?.resize(50);
        outputRef.current?.resize(50);
        cssRef.current?.resize(33);
        htmlRef.current?.resize(33);
        jsRef.current?.resize(33);
        break;
      default:
        break;
    }
  }, [editorSize]);

  useEffect(() => {
    setSrcDoc(`
        <html>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
        </html>
      `);
  }, [htmlCode, cssCode, jsCode]);

  const output = (
    <Panel defaultSize={50} collapsible={true} ref={outputRef}>
      <iframe
        className="w-full h-full"
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
      />
    </Panel>
  );
  const editors = (
    <Panel defaultSize={50} collapsible={true} ref={editorsRef}>
      <div className="w-screen h-full">
        <PanelGroup
          autoSaveId="editor"
          direction={layout == "t" ? "horizontal" : "vertical"}
        >
          <Panel ref={htmlRef}>
            <CodeEditor
              collapse={onCollapse}
              expand={onExpand}
              language={html}
              displayName={htmlDisplayName}
              value={htmlCode}
              onChange={sethtml}
            />
          </Panel>
          <PanelResizeHandle
            className={cn(
              "bg-black",
              layout == "t"
                ? "w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
                : "h-3 border-t-[0.5px] border-b-[0.5px] border-zinc-500"
            )}
            onMouseDown={() => dispatch(changeSize("c"))}
          />
          <Panel ref={cssRef}>
            <CodeEditor
              collapse={onCollapse}
              expand={onExpand}
              language={css}
              displayName={cssDisplayName}
              value={cssCode}
              onChange={setcss}
            />
          </Panel>
          <PanelResizeHandle
            className={cn(
              "bg-black",
              layout == "t"
                ? "w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
                : "h-3 border-t-[0.5px] border-b-[0.5px] border-zinc-500"
            )}
            onChange={() => dispatch(changeSize("c"))}
          />
          <Panel ref={jsRef}>
            <CodeEditor
              collapse={onCollapse}
              expand={onExpand}
              language={javascript}
              displayName={jsDisplayName}
              value={jsCode}
              onChange={setjs}
            />
          </Panel>
        </PanelGroup>
      </div>
    </Panel>
  );
  return (
    <div className="h-[calc(100vh-64px)]">
      <PanelGroup direction={layout == "t" ? "vertical" : "horizontal"}>
        {(layout == "r" || layout == "t") && (
          <>
            {editors}{" "}
            <PanelResizeHandle
              className={cn(
                "bg-black",
                layout == "t"
                  ? "h-3 border-t-[0.5px] border-b-[0.5px] border-zinc-500"
                  : "w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
              )}
              onChange={() => dispatch(changeSize("c"))}
            />{" "}
            {output}
          </>
        )}
        {layout == "l" && (
          <>
            {output}{" "}
            <PanelResizeHandle
              className={cn(
                "bg-black w-3 border-r-[0.5px] border-l-[0.5px] border-zinc-500"
              )}
              onChange={() => dispatch(changeSize("c"))}
            />{" "}
            {editors}
          </>
        )}
      </PanelGroup>
    </div>
  );
});
*/
