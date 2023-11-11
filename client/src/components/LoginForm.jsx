import { Input } from "@nextui-org/react";

const LoginForm = () => {
  return (
    <form id="login-form" className="flex flex-col gap-5">
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

      {/* --------------- Login Button -------------- */}
      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-3 text-lg font-semibold text-white hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
