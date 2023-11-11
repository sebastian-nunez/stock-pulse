import { Divider } from "@nextui-org/react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="mx-auto my-6 px-6 sm:px-0 lg:w-1/3">
      <div className="flex w-full flex-col gap-3 rounded-xl bg-neutral-100 px-6 py-8 shadow-lg">
        {/* ------------- Header ------------ */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, back!</h2>

          <Divider className="my-1" />
        </div>

        {/* ------------- Form ------------ */}
        <LoginForm />

        {/* --------- Forgot Password --------- */}
        <div className="text-right text-sm">
          <Link
            to="/forgot-password"
            className="border-b-2 border-black pb-0.5 font-semibold "
          >
            Forgot password?
          </Link>
        </div>
        {/* ------------- Sign up ------------- */}
        <p className="mt-3 text-default-600">
          Not a member?{" "}
          <Link
            to="/signup"
            className="border-b-2 border-black pb-0.5 font-semibold text-black"
          >
            Sign up
          </Link>
        </p>

        {/* ------------- Login with GitHub ------------- */}
        <Divider className="my-1" content="OR" />

        <Link to="/auth/github">
          <button className="w-full rounded bg-gray-900 py-3 text-lg font-semibold text-white hover:bg-gray-800">
            <span className="inline-flex gap-2">
              <Github /> Login with GitHub
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
