import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Browser from "./pages/Browser";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import PageNotFound from "./pages/PageNotFound";
import Playground from "./pages/Playground";
import "./styles/App.css";

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/browser",
      element: <Browser />,
    },
    {
      path: "/inventory",
      element: <Inventory />,
    },
    {
      path: "/playground",
      element: <Playground />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <NavBar />
      <div className="container min-h-screen">{element}</div>

      <Toaster position="top-right" />
      <Footer />
    </>
  );
};

export default App;
