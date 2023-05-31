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

          {/* <iframe src="https://www.jiosaavn.com/embed/track/XhcsTH-HvHQ/theme/default/autoplay/false" width="100%" height="200" frameborder="0" allowfullscreen="true" allow="autoplay"></iframe> */}

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
