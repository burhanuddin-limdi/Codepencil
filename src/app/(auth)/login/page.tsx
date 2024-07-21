import { FunctionComponent } from "react";
import { ToastContainer } from "react-toastify";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-zinc-900">
      <ToastContainer />
    </main>
  );
};

export default LoginPage;
