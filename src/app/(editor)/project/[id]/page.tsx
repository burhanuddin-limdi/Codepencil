"use client";
import { db } from "@/../firebaseConfig";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { doc, getDoc } from "firebase/firestore";
import EditorLayout from "@/components/editor/EditorLayout";
import { FunctionComponent, useEffect, useState } from "react";
import {
  changeCss,
  changeHtml,
  changeJs,
  changeName,
  changeProjectEdited,
  setProjectId,
} from "@/store/features/project-data.slice";
import MobileEditorLayout from "@/components/editor/MobileEditorLayout";

interface ProjectProps {}

const Project: FunctionComponent<ProjectProps> = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(false);

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
    const projectId = params?.id as string;

    if (projectId) {
      getData(projectId);
      // dispatch(setProjectId({}));
    } else {
      router.push("/");
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [params]);

  useEffect(() => {
    const newCode = `${htmlCode}${cssCode}${jsCode}`;

    if (newCode !== orignalCode) {
      dispatch(changeProjectEdited(true));
    } else {
      dispatch(changeProjectEdited(false));
    }
  }, [htmlCode, cssCode, jsCode]);

  function handleResize() {
    const isScreenMobile = window.innerWidth < 600;
    const isDeviceMobile = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isScreenMobile || isDeviceMobile);
  }

  async function getData(projectId: string) {
    const projectDocRef = doc(db, "projects", projectId);
    const projectDocSnap = await getDoc(projectDocRef);

    const projectData = projectDocSnap.data() ?? null;
    const html = projectData?.html;
    const css = projectData?.css;
    const js = projectData?.js;

    dispatch(changeName(projectData?.name));
    dispatch(setProjectId({ projectId, uid: projectData?.uid }));
    sethtml(html);
    setcss(css);
    setjs(js);
    setOrignalCode(`${html}${css}${js}`);

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
};

export default Project;
