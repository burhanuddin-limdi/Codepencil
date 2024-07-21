"use client";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/Tooltip";
import LayoutDropdown from "./LayoutDropdown";
import { ToastContainer } from "react-toastify";
import { EditorLayoutRef } from "../editor/EditorLayout";
import { CodeXml, FileCode2, Monitor, RotateCcw } from "lucide-react";
import Link from "next/link";

interface Props {
  layoutRef: React.RefObject<EditorLayoutRef>;
  handleDownload: () => void;
}
export default function Navbar(props: Props) {
  return (
    <>
      <nav className="bg-zinc-800 w-full py-3 px-3 flex items-center justify-between border-b-[0.5px] border-zinc-600">
        <img src="images/logo.svg" className="h-10" alt="" />
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
          <Tooltip tooltipContent={"View Output"}>
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
              <FileCode2 />{" "}
            </Button>
          </Tooltip>
          <LayoutDropdown layoutRef={props.layoutRef} />
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}
