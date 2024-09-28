"use client";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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

    setErrors(errors);

    if (!valid) return;

    const authData = { email, password };

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/editor");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-zinc-900">
      <Card className="bg-zinc-950 border border-zinc-100">
        <CardHeader>
          <CardTitle className="text-white">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="w-screen max-w-[300px] md:max-w-md"
          >
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
            <Button
              variant={"ghost"}
              className="bg-zinc-200 text-zinc-900 hover:text-black hover:bg-white hover:border border border-zinc-200 w-full"
              type="submit"
            >
              Login
            </Button>
            <hr className="my-3" />
            <GoogleLoginButton />
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </main>
  );
};

export default LoginPage;
