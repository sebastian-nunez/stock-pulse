import { Link as UILink } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import BackgroundGradient from "../components/BackgroundGradient";
import "../styles/PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <main className="fof-container">
        <div className="fof">
          <h1>404 - Not Found</h1>

          <br />

          <UILink underline="always">
            <Link to="/">
              <p>Return Home</p>
            </Link>
          </UILink>
        </div>
      </main>

      {/* ------------- Blurred Background -------------- */}
      <BackgroundGradient variant={"secondary"} />
    </div>
  );
};

export default PageNotFound;
