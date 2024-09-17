"use client";
import { Button } from "../ui/button";
import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebaseConfig";

interface GoogleLoginButtonProps {}

const GoogleLoginButton: FunctionComponent<GoogleLoginButtonProps> = () => {
  const router = useRouter();
  async function handleClick() {
    await signInWithPopup(auth, googleProvider);
    router.push("/editor");
  }
  return (
    <Button
      onClick={handleClick}
      className="bg-zinc-200 text-black hover:bg-white hover:border border border-zinc-200 w-full my-3 flex justify-center items-center"
    >
      <img src="/images/google-logo.svg" alt="" className="w-5 h-5 mr-3" />{" "}
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
