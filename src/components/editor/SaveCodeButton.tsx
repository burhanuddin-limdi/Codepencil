import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";
import { Button } from "../ui/button";
import { db } from "@/../firebaseConfig";
import { FunctionComponent, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface SaveCodeButtonProps {
  user: User;
}

const SaveCodeButton: FunctionComponent<SaveCodeButtonProps> = ({ user }) => {
  const router = useRouter();
  async function save() {
    const htmlCode = localStorage.getItem("codepencil-html");
    const cssCode = localStorage.getItem("codepencil-css");
    const jsCode = localStorage.getItem("codepencil-js");

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
          name: "test",
          projectId: projectId,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
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
          projectId: projectId,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

        console.log("Project saved successfully.");
        localStorage.clear();
        router.push(`/project?id=${projectId}`);
      } catch (error) {
        console.error("Error saving project:", error);
      }
    }
  }
  return <Button onClick={save}>Save Code</Button>;
};

export default SaveCodeButton;
