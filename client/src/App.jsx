import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import MainContainer from "./components/layout/MainContainer";
import { useAuth } from "./context/AuthProvider";
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
  const { isLoggedIn, user, logout } = useAuth();
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
      path: "/browser",
      element: isLoggedIn ? <Browser /> : <Login />,
    },
    {
      path: "/inventory",
      element: isLoggedIn ? <Inventory /> : <Login />,
    },
    {
      path: "/playground",
      element: isLoggedIn ? <Playground /> : <Login />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <NavBar />

      <MainContainer>{element}</MainContainer>

      <Toaster position="top-right" />
      <Footer />
    </>
  );
};

export default App;
