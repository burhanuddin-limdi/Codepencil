import { FunctionComponent, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { X } from "lucide-react";
import { PasswordInput } from "../ui/PasswordInput";
import { Button } from "../ui/button";
import GithubLoginButton from "./GithubLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { Input } from "../ui/input";

interface SignUpButtonProps {}

const LogInButton: FunctionComponent<SignUpButtonProps> = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authData = { email, password };
    console.log(authData);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log(data);
  };
  return (
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
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            className="bg-zinc-950 placeholder:text-zinc-200 my-3 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            className="bg-zinc-950 placeholder:text-zinc-200 my-3 text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant={"ghost"}
            className="bg-zinc-200 text-zinc-900 hover:text-black hover:bg-white hover:border border border-zinc-200 mt-3"
          >
            Log In
          </Button>
        </form>
        <hr className="my-3" />
        <GoogleLoginButton />
        <GithubLoginButton />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogInButton;
