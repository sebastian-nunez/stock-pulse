import { Divider, Link } from "@nextui-org/react";
import { Github } from "lucide-react";
import { Link as NavLink } from "react-router-dom";
import SignupForm from "../components/SignupForm";

const SignUp = () => {
  return (
    <div className="mx-auto my-6 px-6 sm:px-0 lg:w-1/3">
      <div className="flex w-full flex-col gap-4 rounded-xl bg-neutral-100 px-6 py-8 shadow-lg">
        {/* ------------- Header ------------ */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Create an account
          </h2>

          <Divider className="my-1" />
        </div>

        {/* ------------- Form ------------ */}
        <SignupForm />

        {/* ------------- Sign up ------------- */}
        <p className="mt-6 text-neutral-600">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-semibold"
            underline="always"
            color="foreground"
          >
            Log In
          </Link>
        </p>
        {/* ------------- Sign up with GitHub ------------- */}
        <Divider className="my-1" content="OR" />

        <NavLink to="/auth/github">
          <button className="w-full rounded bg-gray-900 py-3 text-lg font-semibold text-white hover:bg-gray-800">
            <span className="inline-flex gap-2">
              <Github /> Sign up with GitHub
            </span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
