import { Link } from "react-router-dom";
import { Layers3 } from "lucide-react";
import { Input } from "@nextui-org/react";

const Login = () => {
  return (
    <div className="mt-20 flex items-center justify-center md:flex-row">
      <div className="mr-8 text-left">
        <div className="flex">
          {/* LOGO & SUBTITLE */}
          <Layers3 size={50} className="my-auto" />
          <h1 className="ml-2 mr-9 text-7xl font-extrabold tracking-tighter">
            StockPulse
          </h1>
        </div>
        <p className="my-2.5 pb-6 text-center text-gray-500">
          Managing inventory made effortless!
        </p>

        {/* INPUTS */}
        <div className="rounded-xl bg-gray-100 p-14">
          <Input
            variant="bordered"
            isClearable
            size="lg"
            type="email"
            label="Email"
            className="mb-5 rounded-xl bg-white"
          />
          <Input
            variant="bordered"
            isClearable
            size="lg"
            type="password"
            label="Password"
            className="rounded-xl bg-white"
          />

          {/* LOGIN BUTTON */}
          <Link to="/404">
            <button className="mt-5 rounded bg-gray-900 font-semibold text-white hover:bg-gray-600 md:w-full md:px-7 md:py-2.5">
              Login
            </button>
          </Link>

          {/* FORGOT PASSWORD BUTTON */}
          <div className="flex justify-end">
            <Link to="/404">
              <button className="rounded text-sm font-semibold text-gray-700 underline hover:text-gray-400 md:ml-auto md:px-7 md:py-2.5">
                Forgot password?
              </button>
            </Link>
          </div>

          {/* SIGN UP BUTTON */}
          <p className="mt-5 text-sm">
            Not a member?
            <Link to="/signup">
              {" "}
              <button className="font-semibold text-gray-700 underline hover:text-gray-400 md:ml-auto md:py-2.5">
                Sign up
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
