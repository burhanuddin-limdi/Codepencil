"use client";
import { ToastContainer } from "react-toastify";
import { EditorLayoutRef } from "../editor/EditorLayout";
import LayoutDropdown from "./LayoutDropdown";
import { Button } from "../ui/button";
import {
  EyeOff,
  FolderDown,
  Maximize2,
  RotateCcw,
  ScanQrCode,
} from "lucide-react";
import { Tooltip } from "../ui/Tooltip";

interface Props {
  layoutRef: React.RefObject<EditorLayoutRef>;
  handleDownload: () => void;
}
export default function Navbar(props: Props) {
  return (
    <>
      <nav className="bg-zinc-800 w-screen py-3 px-3 flex items-center justify-between">
        <img src="images/logo.svg" className="h-10" alt="" />
        <div className="flex gap-2">
          <Tooltip tooltipContent={"Reset Editor"}>
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
              <Maximize2 />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Hide Editor"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={() => props.layoutRef?.current?.changeSize("c")}
              size={"sm"}
            >
              <EyeOff />{" "}
            </Button>
          </Tooltip>
          <Tooltip tooltipContent={"Download Code"}>
            <Button
              variant="ghost"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              onClick={props.handleDownload}
              size={"sm"}
            >
              <FolderDown />{" "}
            </Button>
          </Tooltip>
          <LayoutDropdown layoutRef={props.layoutRef} />
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}
