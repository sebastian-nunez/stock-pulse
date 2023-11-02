import { useRoutes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return <div>{element}</div>;
};

export default App;
