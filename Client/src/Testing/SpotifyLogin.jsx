import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { setStoken } from "../reduxSlice";
// import SpotifyPlayer from "react-spotify-web-playback";

const useAuth = (code) => {
  console.log("useauth called with code: ", code);
  const [accessToken, setAcessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("https://queue-it.onrender.com/login", {
        code,
      })
      .then((res) => {
        console.log(res.data);
        setAcessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log("useauth error ", err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("https://queue-it.onrender.com/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAcessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.log("useauth error ", err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  console.log("the acess token from useauth =", accessToken);
  return [accessToken, expiresIn];
};

const Login = () => {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=58f6327adb8d406b86b39a7c330cd125&response_type=code&redirect_uri=https://queue-it.netlify.app/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  return (
    <div className="spotifyLogin">
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

const Dash = ({ code }) => {
  const dispatch = useDispatch();
  console.log("code reaching dashhh", code);
  const [accessToken, expiresIn] = useAuth(code);

  useEffect(() => {
    if (accessToken) {
      dispatch(setStoken(accessToken));

      localStorage.setItem("spotifyAcessToken", accessToken);
      localStorage.setItem("expiresIn", expiresIn);
      localStorage.setItem("storeTime", new Date().getTime());

      const tokenExpiryTime = (expiresIn - 60) * 1000;
      setTimeout(() => {
        localStorage.removeItem("spotifyAccessToken");
      }, tokenExpiryTime);

      console.log("dashboard acess toekn", accessToken);
    }
  }, [accessToken, dispatch]);

  return <></>;
};

const Trial = () => {
  const code = new URLSearchParams(window.location.search).get("code");

  return <div id="auth">{code ? <Dash code={code} /> : <Login />}</div>;
};

export default Trial;
