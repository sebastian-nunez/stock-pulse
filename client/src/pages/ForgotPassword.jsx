import {
  Button,
  Card,
  Divider,
  Input,
  Spinner,
  Link as UILink,
} from "@nextui-org/react";
import { Eye, EyeOff, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DisclaimerBanner from "../components/DisclaimerBanner";
import CenteredContainer from "../components/layout/CenteredContainer";

const ForgotPassword = () => {
  // state
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // password visibility
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to send the code to the provided email
    setStep(2);
    toast.success(`Confirmation code sent to ${email}!`);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to verify the code and proceed to the next step
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to submit the new password and complete the process
    setStep(4);
    toast.success("Password changed successfully!");
  };

  const renderBody = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-default-500">
              In order to set up a new password, we need to confirm you identity
              via email.
            </p>

            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
              <Input
                type="email"
                variant="bordered"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                classNames={{
                  inputWrapper: ["bg-white"],
                  helperWrapper: ["bg-transparent"], // error message
                }}
              />

              <Button
                type="submit"
                color="primary"
                className="w-full rounded py-7 text-lg font-semibold hover:bg-primary-400"
              >
                Send Code
              </Button>
            </form>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-default-500">
              Enter the confirmation code sent to your email.
            </p>

            <form onSubmit={handleCodeSubmit} className="flex flex-col gap-3">
              <Input
                type="text"
                variant="bordered"
                label="Confirmation Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                isRequired
                classNames={{
                  inputWrapper: ["bg-white"],
                  helperWrapper: ["bg-transparent"], // error message
                }}
              />
              <Button
                type="submit"
                color="primary"
                className="w-full rounded py-7 text-lg font-semibold hover:bg-primary-400"
              >
                Verify Code
              </Button>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-default-500">
              Now, set up your new password. Make sure it meets the specified
              requirements.
            </p>
            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-3"
            >
              {/* --------------- New Password -------------- */}
              <Input
                label="New Password"
                variant="bordered"
                type={isVisible ? "text" : "password"}
                isRequired
                onChange={(e) => setNewPassword(e.target.value)}
                description={
                  <div>
                    <h2 className="font-bold">Password Requirements:</h2>
                    <ul>
                      <li>- Be at least 8 characters</li>
                      <li>- Contain at least 1 uppercase letter</li>
                      <li>- Contain at least 1 special character (!@#$&*)</li>
                      <li>- Contain at least 2 numbers</li>
                      <li>- Contain at least 3 lowercase letters</li>
                    </ul>
                  </div>
                }
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="flex items-center justify-center focus:outline-none"
                  >
                    {isVisible ? (
                      <Eye height={18} width={18} />
                    ) : (
                      <EyeOff height={18} width={18} />
                    )}
                  </button>
                }
                classNames={{
                  inputWrapper: ["bg-white"],
                  helperWrapper: ["bg-transparent"], // error message
                }}
              />

              {/* --------------- Confirm New Password -------------- */}
              <Input
                label="Confirm New Password"
                variant="bordered"
                type={isVisible ? "text" : "password"}
                isRequired
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="flex items-center justify-center focus:outline-none"
                  >
                    {isVisible ? (
                      <Eye height={18} width={18} />
                    ) : (
                      <EyeOffIcon height={18} width={18} />
                    )}
                  </button>
                }
                classNames={{
                  inputWrapper: ["bg-white"],
                  helperWrapper: ["bg-transparent"], // error message
                }}
              />

              <Button
                type="submit"
                color="primary"
                className="w-full rounded py-7 text-lg font-semibold hover:bg-primary-400"
              >
                Change Password
              </Button>
            </form>
          </div>
        );

      case 4:
        return (
          <div>
            <p className="text-default-500">
              Password changed successfully! <br />
              <br />
              You can now{" "}
              <UILink
                as={Link}
                to="/login"
                underline="always"
                color="foreground"
              >
                Login
              </UILink>{" "}
              with your new password.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CenteredContainer>
      <DisclaimerBanner>
        The password recovery feature is currently under development. We
        apologize for any inconvenience.
      </DisclaimerBanner>

      <Card className="flex w-full flex-col gap-3 px-6 py-8 drop-shadow-lg">
        {/* ------------- Header ------------ */}
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Forgot Password
            </h2>

            {/* ------------- Step Indicator ------------ */}
            <div className="mb-4 text-lg font-semibold text-neutral-600">
              Step {step} of 4
            </div>
          </div>

          <Divider className="mb-1" />
        </div>

        {/* ------------- Steps ------------ */}
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Spinner color="primary" label="Loading..." />
          </div>
        ) : (
          renderBody()
        )}
      </Card>

      {/* ------------- Blurred Background ------------ */}
      <div class="blob absolute inset-x-1/2 inset-y-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-opacity-60 bg-gradient-to-bl from-indigo-200 via-purple-200 to-pink-200 blur-3xl" />

      <div class="blob absolute inset-x-0 inset-y-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-opacity-60 bg-gradient-to-br from-slate-100 via-purple-200 to-blue-300 blur-3xl" />
    </CenteredContainer>
  );
};

export default ForgotPassword;
