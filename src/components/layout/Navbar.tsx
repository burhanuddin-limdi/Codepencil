"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/Tooltip";
import { useEffect, useState } from "react";
import LayoutDropdown from "./LayoutDropdown";
import { useAppDispatch } from "@/store/hooks";
import ProjectName from "../editor/ProjectName";
import ProfileButton from "../auth/ProfileButton";
import { auth as app } from "@/../firebaseConfig";
import SaveCodeButton from "../editor/SaveCodeButton";
import { ToastContainer, toast } from "react-toastify";
import { changeSize } from "@/store/features/editor-size.slice";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { CodeXml, FileDown, Monitor, RotateCcw } from "lucide-react";
import MobileNavDropdown from "./MobileNavDropdown";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    app;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  function handleResize() {
    const isScreenMobile = window.innerWidth < 600;
    const isDeviceMobile = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isScreenMobile || isDeviceMobile);
  }

  return (
    <>
      <nav className="bg-zinc-800 w-full py-3 px-3 flex items-center justify-between border-b-[0.5px] border-zinc-600 min-w-fit">
        <div className="flex items-center gap-3">
          <Link href={"/"}>
            <img
              src="/images/logo.svg"
              className="h-10 min-h-[25px] w-auto min-w-[25px] mr-3"
              alt=""
            />
          </Link>
          <ProjectName />
        </div>
        {!isMobile && (
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
        )}
        {isMobile && (
          <div className="flex space-x-3">
            {user && (
              <>
                <SaveCodeButton user={user} />
              </>
            )}
            <MobileNavDropdown downloadCode={downloadCode} user={user} />
          </div>
        )}
      </nav>
      <ToastContainer />
    </>
  );
}
