"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FolderKanban, Mail, User as UserIcon, UserRound } from "lucide-react";
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
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

interface ProfileButtonProps {
  user: User;
}

const ProfileButton: FunctionComponent<ProfileButtonProps> = ({ user }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    console.log(userDocSnap);

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
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600 rounded-md aspect-square"
            >
              <UserRound />
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
                      <DropdownMenuItem key={project.projectId}>
                        <span>{project.projectId}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
