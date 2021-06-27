import app from "./app/app";
import video from "./video/video";
import audio from "./audio/audio";
import torrent from "./torrent/torrent";

const reducer = {
  App: app,
  Video: video,
  Audio: audio,
  Torrent: torrent,
};

export default reducer;
