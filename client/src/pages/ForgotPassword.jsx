import { Divider, Input, Spinner } from "@nextui-org/react";
import { Eye, EyeOff, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DisclaimerBanner from "../components/DisclaimerBanner";

const ForgotPassword = () => {
  // state
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
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

            <form onSubmit={handleEmailSubmit}>
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

              <button
                type="submit"
                className="mt-4 w-full rounded bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-600"
              >
                Send Code
              </button>
            </form>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-default-500">
              Enter the confirmation code sent to your email.
            </p>

            <form onSubmit={handleCodeSubmit}>
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
              <button
                type="submit"
                className="mt-4 w-full rounded bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-600"
              >
                Verify Code
              </button>
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

              <button
                type="submit"
                className="mt-4 w-full rounded bg-primary py-3 text-lg font-semibold text-white hover:bg-primary-600"
              >
                Change Password
              </button>
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
              <Link
                to="/login"
                className="border-b-2 border-black pb-0.5 font-semibold text-black"
              >
                Login
              </Link>{" "}
              with your new password.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto my-6 flex flex-col gap-6 px-6 sm:px-0 lg:w-1/3">
      <DisclaimerBanner>
        The password recovery feature is currently under development. We
        apologize for any inconvenience.
      </DisclaimerBanner>

      <div className="flex w-full flex-col gap-3 rounded-xl bg-neutral-100 px-6 py-8 shadow-lg">
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
      </div>
    </div>
  );
};

export default ForgotPassword;
