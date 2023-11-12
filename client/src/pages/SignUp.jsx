import { Divider } from "@nextui-org/react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SignupForm from "../components/SignupForm";

const SignUp = () => {
  return (
    <div className="mx-auto my-6 flex flex-col gap-6 px-6 sm:px-0 lg:w-1/3 ">
      {/* ------------- Disclaimer ------------ */}
      <DisclaimerBanner>
        The sign up feature is currently under development. We apologize for any
        inconvenience.
      </DisclaimerBanner>

      <div className="flex w-full flex-col gap-3 rounded-xl bg-neutral-50 px-6 py-8 shadow-xl">
        {/* ------------- Header ------------ */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Create an account
          </h2>

          <Divider className="my-1" />
        </div>

        {/* ------------- Form ------------ */}
        <SignupForm />

        {/* ------------- Login ------------- */}
        <p className="mt-6 text-default-600">
          Already a member?{" "}
          <Link
            to="/login"
            className="border-b-2 border-black pb-0.5 font-semibold text-black"
          >
            Log In
          </Link>
        </p>
        {/* ------------- Sign up with GitHub ------------- */}
        <Divider className="my-1" content="OR" />

        <Link to="/auth/github">
          <button
            type="button"
            className="w-full rounded bg-gray-900 py-3 text-lg font-semibold text-white hover:bg-gray-800"
          >
            <span className="inline-flex gap-2">
              <Github /> Sign up with GitHub
            </span>
          </button>
        </Link>
      </div>

      {/* ------------- Blurred Background ------------ */}
      <div class="blob absolute inset-x-1/2 inset-y-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-opacity-60 bg-gradient-to-bl from-indigo-200 via-purple-200 to-pink-200 blur-3xl" />

      <div class="blob absolute inset-x-0 inset-y-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-opacity-60 bg-gradient-to-br from-slate-100 via-purple-200 to-blue-300 blur-3xl" />
    </div>
  );
};

export default SignUp;
