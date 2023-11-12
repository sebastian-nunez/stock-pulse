import { Layers3 } from "lucide-react";
import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer bg-neutral-50">
      <Layers3 />
      <p>
        Built by{" "}
        <a
          className="footer-links"
          href="https://www.sebastian-nunez.com"
          target="blank"
        >
          Sebastian Nunez
        </a>{" "}
        and{" "}
        <a
          className="footer-links"
          href="https://www.linkedin.com/in/priscillalynn/"
          target="blank"
        >
          Priscilla Colon.
        </a>
      </p>
    </div>
  );
};

export default Footer;
