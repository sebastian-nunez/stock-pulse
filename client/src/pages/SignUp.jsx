import { Card, Divider } from "@nextui-org/react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundGradient from "../components/BackgroundGradient";
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

      <Card className="flex w-full flex-col gap-3  px-6 py-8 drop-shadow-lg">
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
      </Card>

      {/* ------------- Blurred Background ------------ */}
      <BackgroundGradient variant="accent" />
    </div>
  );
};

export default SignUp;
