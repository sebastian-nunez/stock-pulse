import "./App.css";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return <div>{element}</div>;
};

export default App;
