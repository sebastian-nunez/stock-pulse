import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center md:flex-row">
      <div className="mr-8 text-left">
        {/* LOGO & SUBTITLE */}
        <h1 className="mr-9 text-7xl font-extrabold tracking-tighter">
          Inventory <br /> Management
        </h1>
        <p className="my-2.5 pb-6 text-gray-500">
          Managing inventory made effortless!
        </p>

        {/* GET STARTED BUTTON */}
        <Link to="/signup">
          <button className="rounded bg-primary font-semibold text-white transition duration-250 ease-in-out hover:scale-[1.03] hover:bg-primary-600 md:px-7 md:py-2.5">
            Get Started
          </button>
        </Link>
      </div>

      {/* PAGE HERO */}
      <div>
        <img
          src="../src/assets/stockpulseimage.png"
          alt="inventory management image"
          className="max-w-lg"
        />
      </div>
    </div>
  );
};

export default Home;
