import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import MainContainer from "./components/layout/MainContainer";
import Browser from "./pages/Browser";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Playground from "./pages/Playground";
import SignUp from "./pages/SignUp";
import "./styles/App.css";
import { API_URL } from "./utils/constants";

const App = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, {
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.user);
    };

    getUser();
  }, []);

  const logout = () => {
    (async () => {
      const response = await fetch(`${API_URL}/auth/logout`, {
        credentials: "include",
      });

      await response.json();

      window.location.href = "/";
    })();
  };

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
      element: user?.id ? <Browser /> : <Login />,
    },
    {
      path: "/inventory",
      element: user?.id ? <Inventory /> : <Login />,
    },
    {
      path: "/playground",
      element: user?.id ? <Playground /> : <Login />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <NavBar />

      <MainContainer>
        {element}
        <Button onPress={logout}>Logout</Button>
        {user && <p>{user.username}</p>}
        {user && <img src={user.avatarurl} alt="profile" />}
      </MainContainer>

      <Toaster position="top-right" />
      <Footer />
    </>
  );
};

export default App;
