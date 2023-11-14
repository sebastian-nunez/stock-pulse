import { Button } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoOne } from "../assets/LogoOne";
import { LogoThree } from "../assets/LogoThree";
import { LogoTwo } from "../assets/LogoTwo";
import BackgroundGradient from "../components/BackgroundGradient";

const Home = () => {
  return (
    <div className="flex h-fit flex-col items-center justify-center gap-6 pt-24 sm:text-center">
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
        className=" rounded px-8 py-6 text-lg font-semibold transition duration-250 ease-in-out hover:scale-[1.05] active:animate-appearance-out"
        endContent={<MoveRight className="animate-pulse" />}
      >
        Get Started
      </Button>

      {/* --------------- TRUSTED BY ----------------- */}
      <div class="mx-auto hidden pt-24 text-center sm:block lg:px-36">
        <span class="text-lg font-semibold uppercase text-gray-400">
          TRUSTED BY
        </span>
        <div class="flex flex-col items-center justify-center gap-12 py-8 text-gray-500 sm:flex-row sm:justify-between md:gap-32">
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
