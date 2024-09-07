"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/Tooltip";
import { useEffect, useState } from "react";
import LayoutDropdown from "./LayoutDropdown";
import { ToastContainer } from "react-toastify";
import { auth as app } from "@/../firebaseConfig";
import { EditorLayoutRef } from "../editor/EditorLayout";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { CodeXml, FileDown, Monitor, RotateCcw } from "lucide-react";
import ProfileButton from "../auth/ProfileButton";
import SaveCodeButton from "../editor/SaveCodeButton";
import ProjectName from "../editor/ProjectName";

interface Props {
  layoutRef: React.RefObject<EditorLayoutRef>;
  handleDownload: () => void;
}
export default function Navbar(props: Props) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    app;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <nav className="bg-zinc-800 w-full py-3 px-3 flex items-center justify-between border-b-[0.5px] border-zinc-600">
        <div className="flex items-center gap-3">
          <img src="images/logo.svg" className="h-10" alt="" />
          <ProjectName />
        </div>
        <div className="flex gap-2">
          <Tooltip tooltipContent={"Reset Layout"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={() => props.layoutRef?.current?.changeSize("r")}
              size={"sm"}
            >
              <RotateCcw />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Expand Editor"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={() => props.layoutRef?.current?.changeSize("e")}
              size={"sm"}
            >
              <CodeXml />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Expand Output"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={() => props.layoutRef?.current?.changeSize("c")}
              size={"sm"}
            >
              <Monitor />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Download Code"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={props.handleDownload}
              size={"sm"}
            >
              <FileDown />{" "}
            </Button>
          </Tooltip>

          <LayoutDropdown layoutRef={props.layoutRef} />
          {!user && (
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
          {user && (
            <>
              <SaveCodeButton user={user} /> <ProfileButton user={user} />
            </>
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}
