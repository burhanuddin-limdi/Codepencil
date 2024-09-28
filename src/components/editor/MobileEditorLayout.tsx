"use client";
import { FunctionComponent, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import MobileCodeEditor from "./MobileCodeEditor";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

interface MobileEditorLayoutProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  sethtml: (htmlCode: string) => void;
  setcss: (cssCode: string) => void;
  setjs: (jsCode: string) => void;
  srcDoc: string;
  setSrcDoc: (srcDoc: string) => void;
}

const MobileEditorLayout: FunctionComponent<MobileEditorLayoutProps> = ({
  htmlCode,
  cssCode,
  jsCode,
  sethtml,
  setcss,
  setjs,
  setSrcDoc,
  srcDoc,
}) => {
  const htmlDisplayName = "html";
  const cssDisplayName = "css";
  const jsDisplayName = "js";
  useEffect(() => {
    setSrcDoc(`
        <html>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
        </html>
      `);
  }, [htmlCode, cssCode, jsCode]);
  return (
    <div className="w-full h-[calc(100vh-65px)] flex flex-col">
      <Tabs
        defaultValue="html"
        className="w-full bg-zinc-800 flex-1 max-h-[40vh]"
      >
        <TabsList className="bg-zinc-800 space-x-2 mt-1 mx-1">
          <TabsTrigger value="html" className="bg-zinc-700 text-zinc-50">
            Html
          </TabsTrigger>
          <TabsTrigger value="css" className="bg-zinc-700 text-zinc-50">
            Css
          </TabsTrigger>
          <TabsTrigger value="js" className="bg-zinc-700 text-zinc-50">
            Javascript
          </TabsTrigger>
        </TabsList>
        <TabsContent value="html" className="mt-1">
          <MobileCodeEditor
            language={html}
            displayName={htmlDisplayName}
            value={htmlCode}
            onChange={sethtml}
          />
        </TabsContent>
        <TabsContent value="css" className="mt-1">
          {" "}
          <MobileCodeEditor
            language={css}
            displayName={cssDisplayName}
            value={cssCode}
            onChange={setcss}
          />
        </TabsContent>
        <TabsContent value="js" className="mt-1">
          <MobileCodeEditor
            language={javascript}
            displayName={jsDisplayName}
            value={jsCode}
            onChange={setjs}
          />
        </TabsContent>
      </Tabs>
      <iframe
        className="w-full h-full flex-1"
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default MobileEditorLayout;
