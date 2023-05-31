import React, { useEffect, useState } from "react";
import { from, useQuery, useSubscription, useLazyQuery } from "@apollo/client";
import { ME, FIND_USER, PLAYLIST_ADDED, ADD_PLAYLIST } from "../queries";
// import Browse from "./Browse";
import CreatePlForm from "./CreatePlForm";
import List from "./List";
import "../styles/Playlist.css";
import "../styles/Dashboard.css";
// import PlaylistForm from "./PlaylistForm";
import { animateScroll } from "react-scroll";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DashBoard = ({ logout, spotifyToken }) => {
  const [form, setForm] = useState(false);
  const [list, setList] = useState([]);
  const [userID, setUserID] = useState("");

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

  const location = useLocation();
  console.log(location.pathname.slice(7, 31));
  const decodedToken = localStorage.queueitUserToken
    ? jwtDecode(localStorage.queueitUserToken)
    : null;

  console.log("localstorage for dashboard", decodedToken);

  useEffect(() => {
    setTimeout(() => {
      animateScroll.scrollToTop({
        duration: 0,
      });
    }, 0);

    setUserID(location.pathname.substr(7));
    console.log("user from linnnk", userID);
    // 1000ms (1s) delay before scrolling to top
  }, []);

  useEffect(() => {
    // console.log("check for token in useeffect "spotifyToken)

    console.log("check token for player", spotifyToken);
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Queue It",
        getOAuthToken: (cb) => {
          cb(spotifyToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDevice(device_id);

        axios
          .put(
            `https://api.spotify.com/v1/me/player`,
            {
              device_ids: [device_id],
              play: false,
            },
            {
              headers: {
                Authorization: `Bearer ${spotifyToken}`,
              },
            }
          )
          .then((response) => {
            console.log("Playback transferred successfully.");
          })
          .catch((error) => {
            console.error("Failed to transfer playback:", error);
          });
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
          console.log("Track ended.");
        }

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  const openplaylist = location.pathname.substr(42);
  console.log("open playlist", openplaylist);

  useEffect(() => {
    if (location.pathname.slice(0, 7) === "/users/") {
      setUserID(location.pathname.slice(7, 31));
      setTimeout(() => {
        animateScroll.scrollToTop({
          duration: 0,
        });
      }, 0);
    }
  }, [location]);

  const [findUser, result] = useLazyQuery(FIND_USER, {
    onCompleted: (data) => setList(data.findUser.playlists),
  });

  const updateForm = () => {
    console.log("update form called, toggling values");
    setForm(false);
  };

  console.log("stringg ", typeof userID, userID);
  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { id: userID },
  });

  const updateCount = (num) => {
    console.log("setting new listusing count : ", num);
    setList(num);
  };

  useEffect(() => {
    if (data) {
      console.log("finduser sucessfull", data.findUser);
      setList(data.findUser.playlists);
    }
  }, [data]);
  if (loading) return <>loadinggg....</>;
  if (error) return <>error is : {error.message}</>;

  console.log("finduser ", data.findUser, "list is noww: \n", list);

  if (decodedToken && decodedToken.id === userID && 1) {
    return (
      <>
        <Routes>
          <Route
            path={`/*`}
            element={
              <div className={`user-dashboard`}>
                <Link className="user-dashboard-logout" to="/">
                  <button onClick={logout()}>logout</button>
                </Link>
                <h1>Hey {data.findUser.username} !</h1>
                {/* <h4>{spotifyToken}</h4> */}

                {form ? (
                  <div>
                    <div className="close-addpl" onClick={() => setForm(!form)}>
                      close
                    </div>

                    <CreatePlForm
                      creator={data.findUser}
                      setForm={() => updateForm()}
                      setCount={(val) => updateCount(val)}
                      form={form}
                      list={list}
                      
                    />
                  </div>
                ) : (
                  <div
                    className="user-dashboard-addpl"
                    onClick={() => setForm(!form)}
                  >
                    +
                  </div>
                )}
                {
                  <div className="playlist-container">
                    {list.map((pl) => (
                      <List
                        key={pl.id}
                        playlist={{
                          ...pl,
                          creator: {
                            _id: pl.creator._id,
                            username: data.findUser.username,
                          },
                        }}
                        user={userID}
                        open={openplaylist}
                        close={`/users/${pl.creator._id}`}
                        spotifyToken={spotifyToken}
                        spotifyPlayer={player}
                        deviceId={device}
                      />
                    ))}
                  </div>
                }
              </div>
            }
          />

          <Route
            path="/playlists/:playlistid/*"
            element={
              <div className={`user-dashboard`}>
                <Link className="user-dashboard-logout" to="/">
                  <button onClick={logout()}>logout</button>
                </Link>
                <h1>Hey {data.findUser.username} !</h1>

                {form ? (
                  <div>
                    <div className="close-addpl" onClick={() => setForm(!form)}>
                      close
                    </div>

                    <CreatePlForm
                      creator={data.findUser}
                      setForm={() => updateForm()}
                      setCount={(val) => updateCount(val)}
                      form={form}
                      list={list}
                      // UpdateList ={()=>UpdateList}
                    />
                  </div>
                ) : (
                  <div
                    className="user-dashboard-addpl"
                    onClick={() => setForm(!form)}
                  >
                    +
                  </div>
                )}
                {
                  <div className="playlist-container">
                    {list.map((pl) => (
                      <List
                        key={pl.id}
                        playlist={{
                          ...pl,
                          creator: {
                            _id: pl.creator._id,
                            username: data.findUser.username,
                          },
                        }}
                        user={userID}
                        close={`/users/${pl.creator._id}`}
                        spotifyToken={spotifyToken}
                        spotifyPlayer={player}
                        deviceId={device}
                      />
                    ))}
                  </div>
                }
              </div>
            }
          />
        </Routes>
      </>
    );
  }

  return (
    <Routes>
      <Route
        path={`/`}
        element={
          <div className={`user-dashboard`}>
            not logged in user
            <Link to={`/`}>
              {" "}
              <button>back</button>
            </Link>
            <h1> {data.findUser.username}'s Collection </h1>
            {
              <div className="playlist-container">
                {list.map((pl) => (
                  <List
                    key={pl.id}
                    playlist={{
                      ...pl,
                      creator: {
                        _id: pl.creator._id,
                        username: data.findUser.username,
                      },
                    }}
                    user={""}
                    close={`/users/${pl.creator._id}`}
                  />
                ))}
              </div>
            }
          </div>
        }
      />

      <Route
        path="/playlists/:playlistid/*"
        element={
          <div className={`user-dashboard`}>
            not logged in user
            <Link to={`/`}>
              {" "}
              <button>back</button>
            </Link>
            <h1> {data.findUser.username}'s Collection </h1>
            {
              <div className="playlist-container">
                {list.map((pl) => (
                  <List
                    key={pl.id}
                    playlist={{
                      ...pl,
                      creator: {
                        _id: pl.creator._id,
                        username: data.findUser.username,
                      },
                    }}
                    user={""}
                    open={openplaylist}
                    close={`/users/${pl.creator._id}`}
                  />
                ))}
              </div>
            }
          </div>
        }
      />
    </Routes>
  );
};

export default DashBoard;
