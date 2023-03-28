import { useState } from "react";
// import jwt from 'jsonwebtoken'
import jwtDecode from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
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

function App() {
  const [token, setToken] = useState("");

  // const {loading, error, data} = useQuery(ME)
  // console.log('tokennnnn  ', localStorage.queueitUserToken)

  const logout = () => {
    setToken(null);
    localStorage.clear();
    // client.resetStore()
  };

  const decodedToken = localStorage.queueitUserToken
    ? jwtDecode(localStorage.queueitUserToken)
    : null;

  console.log("tokenns, ", token);

  if (localStorage.length === 0) {

    console.log("redering here no local storage")
    return (
      <Router>
        <Routes>
        <Route
            path="/"
            element={
              <div>
                <LandingPage />
                <AuthForm setToken={setToken} />
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
              <DashBoard  logout={() => logout} />   
              </div>
          }
        />

          <Route
            path="/playlists/:playlistid"
            element={
              <div>
                <LandingPage />
                <AuthForm setToken={setToken} />
                <PlaylistForm />
                <Browse />
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    );
  }

  // console.log(decodedToken)
  // else{

  console.log("render elseee");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            decodedToken ? (
              <Navigate replace to={`/users/${decodedToken.id}`} />
            ) : (
              <div>
                <LandingPage />
                <AuthForm setToken={setToken} />
                <PlaylistForm />
                <Browse />
                <Footer />
              </div>
            )
          }
        />

        <Route
          path={`/users/:userid/*`}
          element={  
            <div> 
              <DashBoard  logout={() => logout} />    
              <PlaylistForm />
              <Browse />
              </div>
          }
        />

        <Route
          path="/playlists/:playlistid"
          element={
            <div>
          <DashBoard  logout={() => logout} />
          <PlaylistForm className="playlistForm" />
          <Browse className="browse" />
          </div>
        }
        />
      </Routes>
    </Router>
  );
  // }
}

export default App;
