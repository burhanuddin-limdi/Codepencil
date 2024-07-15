import { FunctionComponent } from "react";
import { Button } from "../ui/button";

interface GoogleLoginButtonProps {}

const GoogleLoginButton: FunctionComponent<GoogleLoginButtonProps> = () => {
  return (
    <Button className="bg-zinc-200 text-black hover:bg-white hover:border border border-zinc-200">
      <img src="/images/google-logo.svg" alt="" className="w-5 h-5 mr-3" />{" "}
      Login in with Google
    </Button>
  );
};

export default GoogleLoginButton;
