"use client";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import EditorLayout from "@/components/editor/EditorLayout";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  changeHtml,
  changeCss,
  changeJs,
  changeProjectEdited,
  changeName,
  setProjectId,
} from "@/store/features/project-data.slice";

export default function Editor() {
  // const [htmlCode, sethtml] = useLocalStorage("html", "");
  // const [cssCode, setcss] = useLocalStorage("css", "");
  // const [jsCode, setjs] = useLocalStorage("js", "");
  // const [srcDoc, setSrcDoc] = useState("");

  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const htmlCode = useAppSelector(
    (state) => state.projectDataSlice.value.htmlCode ?? ""
  );
  const cssCode = useAppSelector(
    (state) => state.projectDataSlice.value.cssCode ?? ""
  );
  const jsCode = useAppSelector(
    (state) => state.projectDataSlice.value.jsCode ?? ""
  );

  function sethtml(html: string) {
    dispatch(changeHtml(html));
  }

  function setcss(css: string) {
    dispatch(changeCss(css));
  }

  function setjs(js: string) {
    dispatch(changeJs(js));
  }

  const [srcDoc, setSrcDoc] = useState("");
  const [showEditor, setshowEditor] = useState(false);
  const [orignalCode, setOrignalCode] = useState("");

  useEffect(() => {
    getData();
  }, [params]);

  useEffect(() => {
    const newCode = `${htmlCode}${cssCode}${jsCode}`;

    if (newCode !== orignalCode) {
      dispatch(changeProjectEdited(true));
    } else {
      dispatch(changeProjectEdited(false));
    }
  }, [htmlCode, cssCode, jsCode]);

  function getData() {
    const html = localStorage.getItem("codepencil-html")?.slice(1, -1) || "";
    const css = localStorage.getItem("codepencil-css")?.slice(1, -1) || "";
    const js = localStorage.getItem("codepencil-js")?.slice(1, -1) || "";

    console.log(html, css, js);

    sethtml(html);
    setcss(css);
    setjs(js);
    setOrignalCode(`${html}${css}${js}`);
    console.log(`${html}${css}${js}`);

    setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    setshowEditor(true);
  }
  return (
    <>
      {showEditor && (
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
      )}
    </>
  );
}
