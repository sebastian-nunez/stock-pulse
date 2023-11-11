import { Link } from "@nextui-org/react";
import { Layers3 } from "lucide-react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="mx-auto my-12 flex w-1/3 flex-col gap-6">
      {/* ------------- Header ------------ */}
      <div className="inline-flex items-center gap-1">
        <Layers3 size={50} />
        <h1 className="text-6xl font-extrabold tracking-tighter">StockPulse</h1>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-xl bg-neutral-100 px-6 py-10 shadow-lg">
        {/* ------------- Form ------------ */}
        <LoginForm />

        {/* --------- Forgot Password --------- */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-neutral-600"
            underline="always"
            color="foreground"
          >
            Forgot password?
          </Link>
        </div>

        {/* ------------- Sign up ------------- */}
        <p className="mt-3 text-neutral-600">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold"
            underline="always"
            color="foreground"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
