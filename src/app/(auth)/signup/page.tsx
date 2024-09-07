"use client";
import GithubLoginButton from "@/components/auth/GithubLoginButton";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { PasswordInput } from "@/components/ui/PasswordInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/router";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let errors = { email: "", password: "", confirmPassword: "" };

    if (!validateEmail(email)) {
      errors.email = "Invalid email address";
      valid = false;
    }

    if (!validatePassword(password)) {
      errors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(errors);

    if (!valid) return;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setOpen(true);
      } else {
        const data = await res.json();
        if (data.error.includes("email-already-in-use")) {
          toast.error("Email already exists");
        } else {
          toast.error("Failed to sign up");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-zinc-900">
      <Card className="bg-zinc-950 border border-zinc-100">
        <CardHeader>
          <CardTitle className="text-white">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="w-screen max-w-md">
            <Input
              type="email"
              placeholder="Email"
              className="bg-zinc-950 placeholder:text-zinc-200 my-3 text-white w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
            <PasswordInput
              className="bg-zinc-950 placeholder:text-zinc-200 my-3 text-white w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <PasswordInput
              className="bg-zinc-950 placeholder:text-zinc-200 my-3 text-white w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mb-3">
                {errors.confirmPassword}
              </div>
            )}
            <Button
              variant={"ghost"}
              className="bg-zinc-200 text-zinc-900 hover:text-black hover:bg-white hover:border border border-zinc-200 w-full"
              type="submit"
            >
              Sign Up
            </Button>
            <hr className="my-3" />
            <GoogleLoginButton />
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
      <AlertDialog open={open}>
        <AlertDialogContent className="bg-zinc-950 border border-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Sign Up Successful!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-zinc-200 text-zinc-900 hover:text-black hover:bg-white hover:border border border-zinc-200"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login to continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default SignUpPage;
