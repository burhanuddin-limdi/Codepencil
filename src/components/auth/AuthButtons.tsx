import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/PasswordInput";
import GoogleLoginButton from "./GoogleLoginButton";
import GithubLoginButton from "./GithubLoginButton";

interface AuthButtonsProps {}

const AuthButtons: FunctionComponent<AuthButtonsProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Button>Sign Up</Button>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Log In</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-zinc-950 border border-zinc-100">
          <AlertDialogHeader className="relative">
            <AlertDialogTitle>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mt-1 mb-3 text-white">
                  Log In
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1 w-6 h-6 absolute -top-3 -right-3 hover:bg-zinc-600 text-white"
                >
                  <X />
                </Button>
              </div>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Input
            type="email"
            placeholder="Email"
            className="bg-zinc-950 placeholder:text-zinc-200"
          />
          <PasswordInput
            className="bg-zinc-950 placeholder:text-zinc-200"
            placeholder="Password"
          />
          <Button
            variant={"ghost"}
            className="bg-zinc-200 text-zinc-900 hover:text-white hover:bg-zinc-900 hover:border border border-zinc-200 mt-3"
          >
            Log In
          </Button>
          <hr className="my-3" />
          <GoogleLoginButton />
          <GithubLoginButton />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AuthButtons;
