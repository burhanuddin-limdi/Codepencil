import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";
import { Button } from "../ui/button";
import { db } from "@/../firebaseConfig";
import { FunctionComponent, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface SaveCodeButtonProps {
  user: User;
}

const SaveCodeButton: FunctionComponent<SaveCodeButtonProps> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const projectName = useAppSelector(
    (state) => state.projectDataSlice.value.name
  );

  const isProjectEdited = useAppSelector(
    (state) => state.projectDataSlice.value.projectEdited
  );

  const htmlCode = useAppSelector(
    (state) => state.projectDataSlice.value.htmlCode ?? ""
  );
  const cssCode = useAppSelector(
    (state) => state.projectDataSlice.value.cssCode ?? ""
  );
  const jsCode = useAppSelector(
    (state) => state.projectDataSlice.value.jsCode ?? ""
  );

  const projectId = useAppSelector(
    (state) => state.projectDataSlice.value.projectId
  );

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  function save() {
    if (pathname?.includes("editor")) {
      saveNewProject();
    } else if (pathname?.includes("project")) {
      updateProject();
    }
  }

  async function updateProject() {
    console.log("edit");
    if (user && projectId) {
      const uid = user.uid;
      const userDocRef = doc(db, "users", uid);
      const projectDocRef = doc(db, "projects", projectId);
      try {
        const userDocSnap = await getDoc(userDocRef);
        console.log(userDocSnap.exists());

        let currentProjects: any = [];

        if (userDocSnap.exists()) {
          currentProjects = userDocSnap.data().projects || [];
          console.log(currentProjects);
        }

        // currentProjects.push({
        //   name: projectName,
        //   projectId: projectId,
        // });

        currentProjects = currentProjects.map((project: any) => {
          if (project.projectId === projectId) {
            return {
              name: projectName,
              projectId: projectId,
            };
          }
          return project;
        });

        await setDoc(
          userDocRef,
          { projects: currentProjects },
          { merge: true }
        );
        await setDoc(projectDocRef, {
          uid,
          js: jsCode,
          css: cssCode,
          html: htmlCode,
          name: projectName,
          projectId: projectId,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

        console.log("Project saved successfully.");
        localStorage.clear();
        router.push(`/project/${projectId}`);
      } catch (error) {
        console.error("Error saving project:", error);
      }
    }
  }

  async function saveNewProject() {
    const htmlCode =
      localStorage.getItem("codepencil-html")?.slice(1, -1) || "";
    const cssCode = localStorage.getItem("codepencil-css")?.slice(1, -1) || "";
    const jsCode = localStorage.getItem("codepencil-js")?.slice(1, -1) || "";
    console.log(htmlCode, cssCode, jsCode);

    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, "users", uid);
      const projectId = uuidv4();
      const projectDocRef = doc(db, "projects", projectId);
      try {
        const userDocSnap = await getDoc(userDocRef);
        console.log(userDocSnap.exists());

        let currentProjects: any = [];

        if (userDocSnap.exists()) {
          currentProjects = userDocSnap.data().projects || [];
          console.log(currentProjects);
        }

        currentProjects.push({
          name: projectName,
          projectId: projectId,
        });

        await setDoc(
          userDocRef,
          { projects: currentProjects },
          { merge: true }
        );
        await setDoc(projectDocRef, {
          uid,
          js: jsCode,
          css: cssCode,
          html: htmlCode,
          name: projectName,
          projectId: projectId,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

        console.log("Project saved successfully.");
        localStorage.clear();
        router.push(`/project/${projectId}`);
      } catch (error) {
        console.error("Error saving project:", error);
      }
    }
  }
  return (
    <>
      {(pathname?.includes("editor") || isProjectEdited) && (
        <Button onClick={save} className="w-28">
          Save Code
        </Button>
      )}
    </>
  );
};

export default SaveCodeButton;
