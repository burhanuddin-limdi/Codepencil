"use client";

import { forwardRef, useState } from "react";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(className)}
          ref={ref}
          {...props}
        />
        <div className="flex items-center space-x-2 my-4 w-fit">
          <Checkbox
            id="terms"
            checked={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
            className="border-white"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
          >
            Show Password
          </label>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
