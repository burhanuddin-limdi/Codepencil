import { FunctionComponent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Expand, Minimize2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorDropdownProps {
  onExpand: () => void;
  onMinimize: () => void;
}

const EditorDropdown: FunctionComponent<EditorDropdownProps> = (
  props: EditorDropdownProps
) => {
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className={cn(
            "text-white bg-zinc-800 h-7 hover:text-black hover:bg-zinc-600 focus-visible:ring-offset-0 focus-visible:ring-0 hover:border-0"
          )}
        >
          <ChevronDown size={17} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 bg-zinc-800 text-white border-0"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={props.onExpand}
            className="flex justify-between items-center focus:bg-zinc-600"
          >
            <p>Expand</p>
            <Expand size={17} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={props.onMinimize}
            className="flex justify-between items-center focus:bg-zinc-600"
          >
            <p>Minimize</p>
            <Minimize2Icon size={17} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditorDropdown;
