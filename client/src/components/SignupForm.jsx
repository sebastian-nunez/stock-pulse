import { Input } from "@nextui-org/react";

const SignupForm = () => {
  return (
    <form id="signup-form" className="flex flex-col gap-5">
      {/* --------------- Firstname -------------- */}
      <Input
        variant="bordered"
        type="text"
        label="Username"
        isClearable
        isRequired
        className="rounded-xl bg-white"
      />

      {/* --------------- Email -------------- */}
      <Input
        variant="bordered"
        type="email"
        label="Email"
        isClearable
        isRequired
        className="rounded-xl bg-white"
      />

      {/* --------------- Password -------------- */}
      <Input
        variant="bordered"
        type="password"
        label="Password"
        isClearable
        isRequired
        className="rounded-xl bg-white"
      />

      {/* --------------- Confirm Password -------------- */}
      <Input
        variant="bordered"
        type="password"
        label="Confirm Password"
        isClearable
        isRequired
        className="rounded-xl bg-white"
      />

      {/* --------------- Sign up Button -------------- */}
      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-3 text-lg font-semibold text-white hover:bg-blue-600"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
