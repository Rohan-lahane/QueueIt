import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PLAYLIST_BY_ID, ADD_SONG, FIND_USER } from "../queries";
import "../styles/Playlist.css";
import SongDisplay from "./SongDisplay";
import { Button, Modal } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const AddSongForm = ({ addTo, updateSongForm, updateSongList, songlist }) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [addSong, result] = useMutation(ADD_SONG);

  const handleSongSubmit = async (event) => {
    event.preventDefault();
    // console.log("handleclick link", typeof(link), "platform: ", typeof(platform))
    const song = {
      title: title,
      link: link,
      platform: platform,
    };
    const playlistId = addTo;
    console.log(
      "songg set: ",
      typeof link,
      typeof platform,
      typeof title,
      addTo
    );
    addSong({ variables: { playlistId, title, link, platform } });

    setTitle("");
    setPlatform("");
    setLink("");
  };

  useEffect(() => {
    if (result.data) {
      const newsonglist = result.data.addSong.songs;
      console.log("add song data", result.data.addSong.songs, newsonglist);
      updateSongForm();
      updateSongList(newsonglist);
    }
  }, [result.data]);

  return (
    <>
      <form onSubmit={handleSongSubmit}>
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        linnk:
        <input value={link} onChange={({ target }) => setLink(target.value)} />
        Platform:
        <select
          value={platform}
          onChange={(e) => {
            console.log("dropdown:", e.target.value);
            setPlatform(e.target.value);
          }}
        >
          <option value="">Platform: </option>
          <option value="spotify">Spotify</option>
          <option value="youtube">Youtube</option>
          <option value="soundcloud">SoundCloud</option>
          <option value="apple">Apple Music</option>
          <option value="drive">G Drive</option>
        </select>
        <button type="submit">song++</button>
      </form>

      {result.loading && <>making your song</>}
      {result.error && <>ugh , {result.error.message} </>}
    </>
  );
};

const List = (props) => {
  const location = useLocation();
  const previousPath = location.state?.prevPath;
  const [count, setCount] = useState(-1);

  const [songForm, setSongForm] = useState(false);

  const [open, setOpen] = useState(false);
  const [songList, setSongList] = useState([]);

  const spotifyToken = localStorage.spotifyAcessToken
    ? localStorage.spotifyAcessToken
    : null;

  console.log("spotify token in list", spotifyToken);

  const updateSongs = (songs) => {
    console.log("setting new song list : ", songs);
    setSongList(songs);
  };

  const updateSongForm = () => {
    console.log("update song form called, toggling values");
    setSongForm(false);
  };

  useEffect(() => {
    setSongList(props.playlist.songs);
    if (props.open && props.open === props.playlist.id) {
      setOpen(true);
    }
  }, []);

  return (
    <div className={`playlist ${open ? "playlist-open" : ""}`}>
      <Link
        to={
          props.close === "/"
            ? `/playlists/${props.playlist.id}`
            : `/users/${props.playlist.creator._id}/playlists/${props.playlist.id}`
        }
      >
        <div
          className={`playlist-title ${open ? "no-hover" : ""}`}
          onClick={() => setOpen(true)}
        >
          {props.playlist.title}
        </div>
      </Link>

      <div>
        {open ? (
          <div>
            <Link to={`${props.close}`}>
              <button
                className="playlist-close-button"
                onClick={() => {
                  setCount(-1);
                  setOpen(false);
                }}
              >
                Close
              </button>
            </Link>
            {spotifyToken ? (
              count === -1 ? (
                <button onClick={() => setCount(count + 1)}>PLAY</button>
              ) : (
                <div>
                  <button onClick={() => setCount(-1)}>Stop</button>{" "}
                  <button onClick={() => setCount(count + 1)}>next</button>
                  <button onClick={() => setCount(count - 1)}>Prev</button>
                </div>
              )
            ) : (
              <p>login to play </p>
            )}
            {songList.length ? (
              songList.map((song, index) => (
                <SongDisplay
                  key={song.link}
                  index={index}
                  title={song.title}
                  link={song.link}
                  platform={song.platform}
                  spotifyToken={spotifyToken}
                  count={count}
                  setCount={(n) => setCount(count + n)}
                  spotifyPlayer={props.spotifyPlayer}
                  deviceId={props.deviceId}
                />
              ))
            ) : (
              <>add some songs to this playlist!</>
            )}
            <div>
              {songForm ? (
                <>
                  <button onClick={() => setSongForm(false)}>cancel</button>
                  <AddSongForm
                    addTo={props.id}
                    updateSongForm={() => updateSongForm()}
                    updateSongList={(songs) => updateSongs(songs)}
                    songlist={songList}
                  />
                </>
              ) : (
                <>
                  {" "}
                  {props.user === props.playlist.creator._id && (
                    <button onClick={() => setSongForm(true)}>add song</button>
                  )}{" "}
                </>
              )}
            </div>
          </div>
        ) : (
          <Link to={`/users/${props.playlist.creator._id}`}>
            <h4 className={`playlist-creator`}>
              {props.playlist.creator.username}
            </h4>
          </Link>
        )}
      </div>
    </div>
  );
};

export default List;
