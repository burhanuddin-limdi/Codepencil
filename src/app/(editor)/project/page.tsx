"use client";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/../firebaseConfig";
import EditorLayout from "@/components/editor/EditorLayout";
import { formatCode } from "@/lib/format-code";

interface ProjectProps {}

const Project: FunctionComponent<ProjectProps> = () => {
  const router = useRouter();
  const [htmlCode, sethtml] = useState("");
  const [cssCode, setcss] = useState("");
  const [jsCode, setjs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [showEditor, setshowEditor] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");
    if (projectId) {
      getData(projectId);
    } else {
      router.push("/");
    }
  }, []);

  async function getData(projectId: string) {
    const projectDocRef = doc(db, "projects", projectId);
    const projectDocSnap = await getDoc(projectDocRef);

    const projectData = projectDocSnap.data() ?? null;

    sethtml(formatCode(projectData?.html));
    setcss(formatCode(projectData?.css));
    setjs(formatCode(projectData?.js));
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
};

export default Project;
