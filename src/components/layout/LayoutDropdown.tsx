import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import { EditorLayoutRef } from "../editor/EditorLayout";
import { PanelLeft, PanelRight, PanelTop, RotateCcw } from "lucide-react";
import { Tooltip } from "../ui/Tooltip";

interface LayoutDropdownProps {
  layoutRef: React.RefObject<EditorLayoutRef>;
}

const LayoutDropdown: FunctionComponent<LayoutDropdownProps> = (
  props: LayoutDropdownProps
) => {
  const [layoutType, setlayoutType] = useState("t");

  return (
    <>
      <DropdownMenu>
        <Tooltip tooltipContent={"Change Layout"}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="destructive"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600"
              size="sm"
            >
              {layoutType === "r" ? (
                <PanelLeft />
              ) : layoutType === "l" ? (
                <PanelRight />
              ) : (
                <PanelTop />
              )}
            </Button>
          </DropdownMenuTrigger>
        </Tooltip>
        <DropdownMenuContent className="w-fit bg-zinc-800">
          <DropdownMenuGroup className="flex">
            <DropdownMenuItem
              onClick={() => {
                props.layoutRef?.current?.setLayout("r");
                setlayoutType("r");
              }}
              className="focus:bg-zinc-600 hover:text-black text-white"
            >
              <PanelLeft className="text-inherit" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                props.layoutRef?.current?.setLayout("l");
                setlayoutType("l");
              }}
              className="focus:bg-zinc-600 hover:text-black text-white"
            >
              <PanelRight className="text-inherit" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                props.layoutRef?.current?.setLayout("t");
                setlayoutType("t");
              }}
              className="focus:bg-zinc-600 hover:text-black text-white"
            >
              <PanelTop className="text-inherit" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LayoutDropdown;
