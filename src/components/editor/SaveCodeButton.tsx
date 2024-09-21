import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";
import { Button } from "../ui/button";
import { db } from "@/../firebaseConfig";
import { FunctionComponent, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface SaveCodeButtonProps {
  user: User;
}

const SaveCodeButton: FunctionComponent<SaveCodeButtonProps> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

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

  const projectUid = useAppSelector(
    (state) => state.projectDataSlice.value.uid
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
    if (user && projectId) {
      if (projectUid === user.uid) {
        console.log("owner");
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
          console.log(error);
        }
      } else {
        console.log("Error: You are not authorized to save this project.");
        setShowPopup(true);
      }
    }
  }

  async function saveNewProject() {
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
        setShowPopup(false);
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
      <AlertDialog open={showPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You are not the owner of this project
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to clone this project to your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowPopup(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={saveNewProject}>
              Clone
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SaveCodeButton;
