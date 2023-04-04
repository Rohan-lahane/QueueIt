import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PLAYLIST } from "../queries";
import "../styles/CreatePlaylist.css";

const CreatePlForm = ({ creator, setForm, list, setCount }) => {
  const [title, setTitle] = useState("");

  const [addPlaylist, result] = useMutation(ADD_PLAYLIST);
  const creatorId = creator._id;
  const submitPlaylistForm = async (event) => {
    event.preventDefault();
    console.log("new playlist submited: ", title, creatorId);
    addPlaylist({ variables: { title, creatorId } });

    setTitle("");
  };

  useEffect(() => {
    if (result.data) {
      const newlist = list.concat(result.data.addPlaylist);
      console.log("add playlist data", result.data.addPlaylist.id, newlist);
      setForm();
      setCount(newlist);
    }
  }, [result.data]);

  if (result.data) {
    console.log(result.data.addPlaylist);
  }

  return (
    <div className="create-playlist">
      <form onSubmit={submitPlaylistForm}>
        <input
          placeholder="name your playlist"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <button type="submit">Add</button>
        {result.loading && <>making your playlist</>}
        {result.error && <>oops, {result.error.message} </>}
      </form>
    </div>
  );
};

export default CreatePlForm;
