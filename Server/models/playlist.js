const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  songs: [
    {
      title: {
        type: String,
        required: true,
      },

      link: {
        type: String,
        required: true,
      },

      platform: {
        type: String,
        required: true,
      },
    },
  ],
  description: { type: String },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

playlistSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
