import { useRoutes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Playground from "./pages/Playground";

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
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
      <div className="container mx-auto min-h-screen py-4">{element}</div>
      <Footer />
    </>
  );
};

export default App;
