import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import { PanelLeft, PanelRight, PanelTop } from "lucide-react";
import { Tooltip } from "../ui/Tooltip";
import { changeLayout } from "@/store/features/editor-layout.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface LayoutDropdownProps {}

const LayoutDropdown: FunctionComponent<LayoutDropdownProps> = (
  props: LayoutDropdownProps
) => {
  const dispatch = useAppDispatch();

  const layoutType = useAppSelector(
    (state) => state.editorLayoutSlice.value.layoutType
  );

  return (
    <>
      <DropdownMenu>
        <Tooltip tooltipContent={"Change Layout"}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="destructive"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600 hover:text-zinc-800"
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
                dispatch(changeLayout("r"));
              }}
              className="focus:bg-zinc-600 hover:text-black text-white"
            >
              <PanelLeft className="text-inherit" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                dispatch(changeLayout("l"));
              }}
              className="focus:bg-zinc-600 hover:text-black text-white"
            >
              <PanelRight className="text-inherit" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                dispatch(changeLayout("t"));
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
