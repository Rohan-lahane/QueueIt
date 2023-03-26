import { useState } from "react";
// import jwt from 'jsonwebtoken'
import jwtDecode from "jwt-decode";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Browse from "./components/Browse";
import DashBoard from "./components/DashBoard";
import PlaylistForm from "./components/PlaylistForm";
import "./styles/App.css";
import { CREATE_USER, LOGIN, ME } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import ReactPlayer from "react-player";
import { Spotify } from "react-spotify-embed";
import Footer from "./components/Footer";
import {Link, animateScroll as scroll} from 'react-scroll'

function App() {
  const [token, setToken] = useState("");

  // const {loading, error, data} = useQuery(ME)
  // console.log('tokennnnn  ', localStorage.queueitUserToken)

  const logout = () => {
    setToken(null);
    localStorage.clear();
    // client.resetStore()
  };

  const updatePlayList = (pl) => {
    setPlayList([...playList, pl]);
  };

  if (localStorage.length === 0) {
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

        <AuthForm setToken={setToken} />
        <PlaylistForm />
        <Browse />

        <Footer />
      </div>
    );
  }

  const decodedToken = jwtDecode(localStorage.queueitUserToken);
  console.log("tokenns, ", token, "decoded : ", decodedToken);

  return (
    <>
      {decodedToken.username} logged in lololl
      <button onClick={logout}>logout</button>
      <DashBoard userId={decodedToken.id} />
    </>
  );
}

export default App;
