"use client";
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import EditorLayout from "@/components/editor/EditorLayout";

export default function Editor() {
  const [htmlCode, sethtml] = useLocalStorage("html", "");
  const [cssCode, setcss] = useLocalStorage("css", "");
  const [jsCode, setjs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  return (
    <>
      <EditorLayout
        htmlCode={htmlCode}
        cssCode={cssCode}
        jsCode={jsCode}
        srcDoc={srcDoc}
        setSrcDoc={setSrcDoc}
        setcss={setcss}
        sethtml={sethtml}
        setjs={setjs}
      />
    </>
  );
}
