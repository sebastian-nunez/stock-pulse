import { Link } from "@nextui-org/react";
import { Layers3 } from "lucide-react";
import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer bg-neutral-50 text-default-600">
      <Layers3 />

      <p>
        Built by{" "}
        <Link
          href="https://www.sebastian-nunez.com"
          underline="always"
          color="foreground"
          isExternal
        >
          Sebastian Nunez
        </Link>{" "}
        and{" "}
        <Link
          href="https://www.linkedin.com/in/priscillalynn/"
          underline="always"
          color="foreground"
          isExternal
        >
          Priscilla Colon.
        </Link>
      </p>
    </div>
  );
};

export default Footer;
