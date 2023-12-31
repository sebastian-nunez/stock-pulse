import { Button, Card, Divider, Link as UILink } from "@nextui-org/react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import DisclaimerBanner from "../components/DisclaimerBanner";
import LoginForm from "../components/LoginForm";
import CenteredContainer from "../components/layout/CenteredContainer";
import { API_URL } from "../utils/constants";

const Login = () => {
  return (
    <CenteredContainer>
      {/* ------------- Disclaimer ------------ */}
      <DisclaimerBanner>
        Currently, we only support login via GitHub.
      </DisclaimerBanner>

      <Card className="flex flex-col gap-3 px-6 py-8 drop-shadow-lg">
        {/* ------------- Header ------------ */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, back!</h2>

          <Divider className="my-1" />
        </div>

        {/* ------------- Form ------------ */}
        <LoginForm />

        {/* --------- Forgot Password --------- */}
        <div className="text-right text-sm">
          <UILink
            as={Link}
            to="/forgot-password"
            underline="always"
            color="foreground"
          >
            Forgot password?
          </UILink>
        </div>

        {/* ------------- Sign up ------------- */}
        <p className="mt-3 text-default-600">
          Not a member?{" "}
          <UILink as={Link} to="/signup" underline="always" color="foreground">
            Sign up
          </UILink>
        </p>

        {/* ------------- Login with GitHub ------------- */}
        <Divider className="my-1" content="OR" />

        <Button
          as={Link}
          to={`${API_URL}/auth/github`}
          className="w-full rounded bg-gray-900 py-7 text-lg font-semibold text-white hover:bg-gray-800"
        >
          <span className="inline-flex gap-2">
            <Github /> Login with GitHub
          </span>
        </Button>
      </Card>

      {/* ------------- Blurred Background ------------ */}
      <div class="blob absolute inset-x-1/2 inset-y-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-opacity-60 bg-gradient-to-bl from-indigo-200 via-purple-200 to-pink-200 blur-3xl" />

      <div class="blob absolute inset-x-0 inset-y-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-opacity-60 bg-gradient-to-br from-slate-100 via-purple-200 to-blue-300 blur-3xl" />
    </CenteredContainer>
  );
};

export default Login;
