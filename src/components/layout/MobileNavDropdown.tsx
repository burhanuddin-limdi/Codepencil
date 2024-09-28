"use client";
import { FunctionComponent, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, FileDown, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { User } from "firebase/auth";
import ProfileButton from "../auth/ProfileButton";

interface MobileNavDropdownProps {
  downloadCode: () => void;
  user: User | null;
}

const MobileNavDropdown: FunctionComponent<MobileNavDropdownProps> = ({
  downloadCode,
  user,
}) => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLogged(!!user);
  }, [user]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="focus-visible:ring-0 text-white p-0">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={downloadCode}>
            <FileDown className="mr-2 h-4 w-4" />
            <span>Download Code</span>
          </DropdownMenuItem>
          {!isLogged && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          {isLogged && <ProfileButton user={user as User} isMobile={true} />}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavDropdown;
