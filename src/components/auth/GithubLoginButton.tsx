"use client";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { signInWithRedirect } from "firebase/auth";
import { auth, githubProvider } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

interface GithubLoginButtonProps {}

const GithubLoginButton: FunctionComponent<GithubLoginButtonProps> = () => {
  const router = useRouter();
  async function handleClick() {
    await signInWithRedirect(auth, githubProvider);
    router.push("/editor");
  }
  return (
    <Button
      className="bg-zinc-900 text-zinc-300 hover:text-white hover:border border border-zinc-200 w-full my-3 flex justify-center items-center"
      onClick={handleClick}
    >
      <img
        src="/images/github-logo.svg"
        alt=""
        className="w-5 h-5 mr-3 fill-white"
      />{" "}
      Continue with Github
    </Button>
  );
};

export default GithubLoginButton;
