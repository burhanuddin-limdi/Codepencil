import { FunctionComponent } from "react";
import { Button } from "../ui/button";

interface GithubLoginButtonProps {}

const GithubLoginButton: FunctionComponent<GithubLoginButtonProps> = () => {
  return (
    <Button className="bg-zinc-900 text-zinc-300 hover:text-white hover:border border border-zinc-200 w-full my-3 flex justify-center items-center">
      <img
        src="/images/github-logo.svg"
        alt=""
        className="w-5 h-5 mr-3 fill-white"
      />{" "}
      Login in with Github
    </Button>
  );
};

export default GithubLoginButton;
