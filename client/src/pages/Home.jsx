import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
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
        className="rounded px-12 py-6 text-lg font-semibold transition duration-250 ease-in-out hover:scale-[1.05]"
      >
        Get Started
      </Button>

      {/* ------------- Blurred Background ------------ */}
      <BackgroundGradient variant={"primary"} />
    </div>
  );
};

export default Home;
