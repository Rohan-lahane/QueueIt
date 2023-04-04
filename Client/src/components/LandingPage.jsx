import React from "react";
import "../styles/App.css";
import { Link, animateScroll as scroll } from "react-scroll";

const LandingPage = () => {
  return (
    <div className="App">
      <div className="qit">
        Queue <em>It</em>.{" "}
      </div>
      <div className="intro">
        All your music, in one place.
        <div className="home-buttons">
          <Link
            to="auth"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            // offset={-80}
          >
            <p> Sign In </p>
          </Link>

          <Link
            to="footer"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            // offset={-80}
          >
            <p>How to use</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
