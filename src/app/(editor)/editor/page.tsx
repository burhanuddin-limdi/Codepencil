"use client";
import {
  changeJs,
  changeCss,
  changeHtml,
  changeProjectEdited,
} from "@/store/features/project-data.slice";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EditorLayout from "@/components/editor/EditorLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MobileEditorLayout from "@/components/editor/MobileEditorLayout";

export default function Editor() {
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

  const [srcDoc, setSrcDoc] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [originalCode, setOriginalCode] = useState("");

  function sethtml(html: string) {
    dispatch(changeHtml(html));
  }

  function setcss(css: string) {
    dispatch(changeCss(css));
  }

  function setjs(js: string) {
    dispatch(changeJs(js));
  }

  useEffect(() => {
    handleResize();
    getData();
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [params]);

  useEffect(() => {
    const newCode = `${htmlCode}${cssCode}${jsCode}`;

    if (newCode !== originalCode) {
      dispatch(changeProjectEdited(true));
    } else {
      dispatch(changeProjectEdited(false));
    }
  }, [htmlCode, cssCode, jsCode]);

  function getData() {
    const html = localStorage.getItem("codepencil-html")?.slice(1, -1) || "";
    const css = localStorage.getItem("codepencil-css")?.slice(1, -1) || "";
    const js = localStorage.getItem("codepencil-js")?.slice(1, -1) || "";

    sethtml(html);
    setcss(css);
    setjs(js);
    setOriginalCode(`${html}${css}${js}`);

    setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
    setShowEditor(true);
  }

  function handleResize() {
    const isScreenMobile = window.innerWidth < 600;
    const isDeviceMobile = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isScreenMobile || isDeviceMobile);
  }

  return (
    <>
      {showEditor &&
        (isMobile ? (
          <MobileEditorLayout
            htmlCode={htmlCode}
            cssCode={cssCode}
            jsCode={jsCode}
            srcDoc={srcDoc}
            setSrcDoc={setSrcDoc}
            setcss={setcss}
            sethtml={sethtml}
            setjs={setjs}
          />
        ) : (
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
        ))}
    </>
  );
}
