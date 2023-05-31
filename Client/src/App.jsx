import { useState, useEffect } from "react";
// import jwt from 'jsonwebtoken'
import jwtDecode from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import LandingPage from "./components/LandingPage";
import axios from "axios";
import SpotifyLogin from "./Testing/SpotifyLogin";
import { useSelector } from "react-redux";

const App = () => {
  const [token, setToken] = useState("");
  const stoken = useSelector((state) => {
    console.log("state:", state); // log the state object
    return state.token.stoken;
  });

  const now = new Date().getTime();
  console.log(
    "nowww",
    now,
    localStorage.getItem("storeTime"),
    localStorage.getItem("expiresIn"),
    " \ndiff: ",
    now - localStorage.getItem("storeTime")
  );
  const spotifyToken =
    now - localStorage.getItem("storeTime") >
    localStorage.getItem("expiresIn") * 1000
      ? null
      : localStorage.getItem("spotifyAcessToken");
  if (spotifyToken === null) {
    localStorage.removeItem("spotifyAcessToken");
  }


  const location = useLocation();

  const logout = () => {
    setToken(null);
    localStorage.clear();
  };

  const decodedToken = localStorage.queueitUserToken
    ? jwtDecode(localStorage.queueitUserToken)
    : null;

  console.log("spotify tokenns, ", stoken);

  if (!localStorage.queueitUserToken) {
    console.log("redering here no local storage");
    return (
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <LandingPage />

             
              {spotifyToken ? (
                <AuthForm setToken={setToken} />
              ) : (
                <SpotifyLogin />
              )}
              <PlaylistForm />
              <Browse />
              <Footer />
            </div>
          }
        />

        <Route
          path={`/users/:userid/*`}
          element={
            <div>
              <DashBoard logout={() => logout} />
            </div>
          }
        />

        <Route
          path="/playlists/:playlistid"
          element={
            <div>
              <LandingPage />
              {spotifyToken ? (
                <AuthForm setToken={setToken} />
              ) : (
                <SpotifyLogin />
              )}
              <PlaylistForm />
              <Browse />
              <Footer />
            </div>
          }
        />
      </Routes>
    );
  }


  console.log("render elseee");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            decodedToken && spotifyToken ? (
              <Navigate replace to={`/users/${decodedToken.id}`} />
            ) : (
              <div>
                <LandingPage />
                {spotifyToken ? (
                  <AuthForm setToken={setToken} />
                ) : (
                  <SpotifyLogin />
                )}
                <Footer />
              </div>
            )
          }
        />

        <Route
          path={`/users/:userid/*`}
          element={
            <div>
              <DashBoard logout={() => logout} spotifyToken={spotifyToken} />
             
            </div>
          }
        />

        <Route
          path="/playlists/:playlistid"
          element={
            <div>
              <DashBoard logout={() => logout} spotifyToken={spotifyToken} />
            </div>
          }
        />
      </Routes>
      <PlaylistForm className="playlistForm" />
      <Browse className="browse" />
    </>
  );
  // }
};

export default App;
