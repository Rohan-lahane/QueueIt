import { useEffect, useState } from "react";
import { ME, FIND_PLAYLIST } from "../queries";
import { useLazyQuery, useMutation } from "@apollo/client";

import List from "./List";
import "../styles/FindPlaylist.css";

const PlaylistForm = () => {
  const [title, setTitle] = useState("");
  const [playList, setPlayList] = useState([]);
  const [clear, setClear] = useState(false);
  // const [creator, setCreator] = useState('rohann')
  const [findPlaylist, { loading, data }] = useLazyQuery(FIND_PLAYLIST, {
    onCompleted: (data) => setPlayList(data.findPlaylist),
  });

  const submitSearch = async (event) => {
    event.preventDefault();
    console.log("Search submited:", title, typeof title);
    findPlaylist({ variables: { title } });
    setTitle("");
    setClear(true);
  };

  const clearSearch = () => {
    setPlayList([]);
    setClear(false);
  };

  return (
    <div className="find-playlist">
      <form onSubmit={submitSearch}>
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Find playlist by title"
        />

        <button className="user-dashboard-search" type="submit"> Search </button>
        {clear && <button onClick={clearSearch}> Clear </button>}
      </form>

      <div className="playlist-container">
        {playList.map((pl) => (
          <List key={pl.id} playlist={pl} user={""} close={`/`} />
        ))}
      </div>
      <p className={`find-playlist-explore`}>Explore more :</p>
    </div>
  );
};

export default PlaylistForm;
