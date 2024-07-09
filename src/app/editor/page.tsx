"use client";
import Navbar from "@/components/layout/Navbar";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function Editor() {
  const layoutRef: any = useRef();

  function download() {
    layoutRef.current.downloadCode();
  }

  async function downloadCode(
    htmlCode: string,
    cssCode: string,
    jsCode: string
  ) {
    const response = await fetch("/api/generate-files", {
      method: "POST",
      body: JSON.stringify({ htmlCode, cssCode, jsCode }),
    });

    if (response.status === 200) {
      toast("Download Started");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "files.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  return (
    <>
      <Navbar layoutRef={layoutRef} handleDownload={download} />
      <EditorLayout
        layoutType={"t"}
        ref={layoutRef}
        downloadCode={downloadCode}
      />
    </>
  );
}
