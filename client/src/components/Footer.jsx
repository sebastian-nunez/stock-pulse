import React from "react";
import { Layers3 } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Layers3 />
      <p>
        Built by{" "}
        <a
          className="footer-links"
          href="https://www.linkedin.com/in/sebastian-nunez-profile/"
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
      {/*
        <p>StockPulse &copy;</p>
        <div className="footer-wrap">
        <p className="title">Title</p>
        <p className="footer-details">Contact: info@example.com</p>
        <p className="footer-details">
          Address: 123 Main St, Cityville, State, 12345
        </p>
        <p className="footer-details">Phone: 123-456-7890</p>

        <p className="title">Terms of Service</p>
        <a href="" className="footer-details">
          Link
        </a>
        <a href="" className="footer-details">
          Link
        </a>
        <a href="" className="footer-details">
          Link
        </a>
        </div>*/}
    </div>
  );
};

export default Footer;
