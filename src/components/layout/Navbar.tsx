"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/Tooltip";
import { useEffect, useState } from "react";
import LayoutDropdown from "./LayoutDropdown";
import { ToastContainer, toast } from "react-toastify";
import { auth as app } from "@/../firebaseConfig";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { CodeXml, FileDown, Monitor, RotateCcw } from "lucide-react";
import ProfileButton from "../auth/ProfileButton";
import SaveCodeButton from "../editor/SaveCodeButton";
import ProjectName from "../editor/ProjectName";
import { changeSize } from "@/store/features/editor-size.slice";
import { useAppDispatch } from "@/store/hooks";

interface Props {}
export default function Navbar(props: Props) {
  const dispatch = useAppDispatch();
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

  async function downloadCode() {
    const htmlCode: string = localStorage.getItem("codepencil-html") || "";
    const cssCode: string = localStorage.getItem("codepencil-css") || "";
    const jsCode: string = localStorage.getItem("codepencil-js") || "";
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
              onClick={() => dispatch(changeSize("r"))}
              size={"sm"}
            >
              <RotateCcw />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Expand Editor"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={() => dispatch(changeSize("e"))}
              size={"sm"}
            >
              <CodeXml />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Expand Output"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={() => dispatch(changeSize("o"))}
              size={"sm"}
            >
              <Monitor />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Download Code"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={downloadCode}
              size={"sm"}
            >
              <FileDown />{" "}
            </Button>
          </Tooltip>

          <LayoutDropdown />
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
