import React from "react";
import { Link } from "react-router-dom";
import { Link as UILink } from "@nextui-org/react";
import "./PageNotFound.css";

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
    </div>
  );
};

export default PageNotFound;
