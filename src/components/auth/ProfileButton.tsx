"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  FolderKanban,
  LogOut,
  Mail,
  User as UserIcon,
  UserRound,
} from "lucide-react";
import { Tooltip } from "../ui/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import Link from "next/link";

interface ProfileButtonProps {
  user: User;
  isMobile?: boolean;
}

const ProfileButton: FunctionComponent<ProfileButtonProps> = ({
  user,
  isMobile,
}) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data().projects || [];
      setProjects(data);
    }
  }

  return (
    <>
      <DropdownMenu>
        <Tooltip tooltipContent={"Profile"}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`focus-visible:ring-0 focus-visible:ring-offset-0  transition-all px-2 hover:bg-zinc-600 rounded-md aspect-square ${
                isMobile ? "bg-white text-black" : "bg-zinc-800 text-white"
              }`}
            >
              <UserRound className="h-4 w-4 mr-2" />
              {isMobile && <span>Profile</span>}
            </Button>
          </DropdownMenuTrigger>
        </Tooltip>
        <DropdownMenuContent className="w-56 bg-zinc-800 border-zinc-500">
          <DropdownMenuLabel className="text-white">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-500" />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:text-zinc-950 bg-zinc-800 text-white">
                <FolderKanban className="mr-2 h-4 w-4" />
                <span>Projects</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-zinc-800 text-white border-zinc-400 ">
                  {projects.map((project: any) => {
                    return (
                      <DropdownMenuItem key={project.projectId} asChild>
                        <Link href={`/project/${project.projectId}`}>
                          {project.name}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                  {projects.length === 0 && (
                    <DropdownMenuItem>No projects found</DropdownMenuItem>
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              className="bg-zinc-800 text-white border-zinc-400 "
              onClick={() => signOut(auth)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
