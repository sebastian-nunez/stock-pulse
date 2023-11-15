import { Button, Card, Divider, Link as UILink } from "@nextui-org/react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundGradient from "../components/BackgroundGradient";
import DisclaimerBanner from "../components/DisclaimerBanner";
import SignupForm from "../components/SignupForm";
import CenteredContainer from "../components/layout/CenteredContainer";
import { API_URL } from "../utils/constants";

const SignUp = () => {
  return (
    <CenteredContainer>
      {/* ------------- Disclaimer ------------ */}
      <DisclaimerBanner>
        Currently, we only support sign up via GitHub.
      </DisclaimerBanner>

      <Card className="flex w-full flex-col gap-3 px-6 py-8 drop-shadow-lg">
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
        <p className="mt-3 text-default-600">
          Already a member?{" "}
          <UILink as={Link} to="/login" underline="always" color="foreground">
            Login
          </UILink>
        </p>

        {/* ------------- Sign up with GitHub ------------- */}
        <Divider className="my-1" content="OR" />

        <Button
          as={Link}
          to={`${API_URL}/auth/github`}
          className="w-full rounded bg-gray-900 py-7 text-lg font-semibold text-white hover:bg-gray-800"
        >
          <span className="inline-flex gap-2">
            <Github /> Sign up with GitHub
          </span>
        </Button>
      </Card>

      {/* ------------- Blurred Background ------------ */}
      <BackgroundGradient variant="accent" />
    </CenteredContainer>
  );
};

export default SignUp;
