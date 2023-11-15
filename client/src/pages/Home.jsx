import { Button } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoOne } from "../assets/LogoOne";
import { LogoThree } from "../assets/LogoThree";
import { LogoTwo } from "../assets/LogoTwo";
import BackgroundGradient from "../components/BackgroundGradient";

const Home = () => {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col justify-between pt-28">
      <div className="flex flex-col gap-6 sm:text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-7xl">
          Empower Your Business with <br />
          <span className="inline-flex bg-gradient-to-r from-[#2f68f3] via-purple-600 to-pink-400 bg-clip-text py-1 text-transparent">
            StockPulse Inventory Management
          </span>
        </h1>

        <h2 className="pb-4 pt-1 text-default-500 md:text-2xl lg:px-56">
          Effortlessly track and manage your inventory with StockPulse. Gain
          insights, streamline operations, and boost productivity.
        </h2>

        <Button
          as={Link}
          to="/signup"
          color="primary"
          variant="shadow"
          className="mx-auto w-fit rounded px-8 py-6 text-lg font-semibold transition duration-250 ease-in-out hover:scale-[1.05] active:animate-appearance-out"
          endContent={<MoveRight className="animate-pulse" />}
        >
          Get Started
        </Button>
      </div>

      {/* --------------- TRUSTED BY ----------------- */}
      <div class="mx-auto text-center sm:block lg:px-36">
        <span class="text-lg font-semibold uppercase text-gray-400">
          TRUSTED BY
        </span>
        <div class="flex flex-col items-center justify-center gap-12 pb-6 pt-8 text-gray-500 sm:flex-row sm:justify-between md:gap-32">
          <LogoOne />
          <LogoTwo />
          <LogoThree />
        </div>
      </div>

      {/* ------------- Blurred Background ------------ */}
      <BackgroundGradient variant={"primary"} />
    </div>
  );
};

export default Home;
