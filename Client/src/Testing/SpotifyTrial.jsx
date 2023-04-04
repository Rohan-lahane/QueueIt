import { useState, useEffect } from "react";
import axios from "axios";
// import SpotifyPlayer from "react-spotify-web-playback";

const useAuth = (code) => {
  console.log("useauth called with code: ", code);
  const [accessToken, setAcessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:4000/login", {
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
        .post("http://localhost:5173/refresh", {
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
    "https://accounts.spotify.com/authorize?client_id=58f6327adb8d406b86b39a7c330cd125&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  return <a href={AUTH_URL}>login with spotify</a>;
};

const Player = (props) => {
  const track = {
    name: "",
    album: {
      images: [{ url: "" }],
    },
    artists: [{ name: "" }],
  };

  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [device, setDevice] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Queue It",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDevice(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        if (state.position === state.duration) {
          console.log('Track ended.');
        }

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

     

      player.connect();
    };
  }, []);

  const tranferPlayback = (device) => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player`,
        {
          device_ids: [device],
          play: false,
        },
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Playback transferred successfully.");
      })
      .catch((error) => {
        console.error("Failed to transfer playback:", error);
      });
  };

  const playSong = (device, uri) => {
  
    
    player.resume().then(() => {
      console.log('Resumed!');
    });

      axios({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        'Authorization': `Bearer ${props.token}`
      },
      data: {
        uris: [uri]
      }
    })
      .then(response => {
        console.log('Song played successfully');
      })
      .catch(error => {
        console.error(error ," uri passed: ", uri, "\n acess token ", props.token);
      });
    // player.nextTrack().then(() => {
    //   console.log('Skipped to next track!');
    // });

  };

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              Instance not active.
              {device && (
                <button onClick={() => tranferPlayback(device)}>
                  Transfer your playback to {device}
                </button>
              )}
            </b>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <div className="now-playing__side">playing on device : {device}</div>

          <button onClick={() => playSong(device,"spotify:track:6e6HDpdRGv2QJCrUn3pXFP")}>Play</button>
          <button>next</button>
        </div>
      </div>
    </>
  );
};

const Dash = ({ code }) => {
  console.log("code reaching dashhh", code);
  const [accessToken, expiresIn] = useAuth(code);
  localStorage.setItem("spotifyAcessToken", accessToken);
  localStorage.setItem("expiresIn", expiresIn);
  localStorage.setItem("storeTime", new Date().getTime());

  const tokenExpiryTime = (expiresIn - 60) * 1000;
  setTimeout(() => {
    localStorage.removeItem("spotifyAccessToken");
  }, tokenExpiryTime);

  console.log("dashboard acess toekn", accessToken);

  const handleQueue = (accessToken) => {
    console.log("acess token for button", accessToken);

    axios
      .get(`https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      this is acesssss {accessToken}
      <button onClick={() => handleQueue(accessToken)}> queue novocaine</button>
      {accessToken && <Player token={accessToken} />}
    </>
  );
};

const Trial = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const now = new Date().getTime();
  console.log("nowww",now, localStorage.getItem("storeTime"), localStorage.getItem("expiresIn"), " \ndiff: ", (now - localStorage.getItem("storeTime")))
  const token =
    ((now - localStorage.getItem("storeTime")) > (localStorage.getItem("expiresIn")*1000))
      ? "null"
      : localStorage.getItem("spotifyAcessToken");
  if (token === "null") {
    localStorage.clear();
  }
  console.log("spotify-code", code);

  return (
    <div>
      {token && token !== "undefined" && token !== "null" ? (
        <Player token={token} />
      ) : code ? (
        <Dash code={code} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Trial;
