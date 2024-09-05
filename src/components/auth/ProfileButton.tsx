import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { UserRound } from "lucide-react";
import { Tooltip } from "../ui/Tooltip";

interface ProfileButtonProps {}

const ProfileButton: FunctionComponent<ProfileButtonProps> = () => {
  return (
    <>
      <Tooltip tooltipContent={"Profile"}>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-800 text-white transition-all px-2 hover:bg-zinc-600 rounded-full aspect-square"
        >
          <UserRound />
        </Button>
      </Tooltip>
    </>
  );
};

export default ProfileButton;
