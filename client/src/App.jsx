import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import ErrorCard from "./components/ErrorCard";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Browser from "./pages/Browser";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Playground from "./pages/Playground";
import SignUp from "./pages/SignUp";
import "./styles/App.css";

const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/auth/github",
      element: (
        <ErrorCard message="We're sorry, but login/sign up via GitHub is not available." />
      ),
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
