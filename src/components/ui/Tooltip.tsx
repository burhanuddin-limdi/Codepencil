"use client";
import { FunctionComponent, ReactNode } from "react";
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn-tooltip";

interface TooltipProps {
  tooltipContent: ReactNode;
  children: ReactNode;
}

export const Tooltip: FunctionComponent<TooltipProps> = ({
  tooltipContent,
  children,
}) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip delayDuration={200} disableHoverableContent={true}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="bg-zinc-800 text-xs px-2 text-white border-zinc-500"
          sideOffset={10}
        >
          <p>{tooltipContent}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};
