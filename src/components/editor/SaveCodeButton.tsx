"use client";
import { FunctionComponent, useEffect } from "react";
import { Button } from "../ui/button";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

interface SaveCodeButtonProps {
  user: User;
}

const SaveCodeButton: FunctionComponent<SaveCodeButtonProps> = ({ user }) => {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    console.log(userDocSnap);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      console.log(data);
    }
  }

  async function save() {
    const htmlCode = localStorage.getItem("codepencil-html");
    const cssCode = localStorage.getItem("codepencil-css");
    const jsCode = localStorage.getItem("codepencil-js");

    if (user) {
      const uid = user.uid;
      console.log(uid);
      const userDocRef = doc(db, "users", uid);
      try {
        const userDocSnap = await getDoc(userDocRef);
        let currentProjects: any = [];

        if (userDocSnap.exists()) {
          currentProjects = userDocSnap.data().projects || [];
        }

        currentProjects.push({
          html: htmlCode,
          css: cssCode,
          js: jsCode,
          projectId: uuidv4(),
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        });

        await setDoc(
          userDocRef,
          { projects: currentProjects },
          { merge: true }
        );

        console.log("Project saved successfully.");
      } catch (error) {
        console.error("Error saving project:", error);
      }
    }
  }
  return <Button onClick={save}>Save Code</Button>;
};

export default SaveCodeButton;
