import app from "./app/app";
import video from "./video/video";
import torrent from "./torrent/torrent";

const action = {
  App: app(),
  Video: video(),
  Torrent: torrent(),
};

export default action;
