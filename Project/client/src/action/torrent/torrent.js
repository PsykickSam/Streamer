import api from "../../api/api.axios";

// Self
import Constants from "../../Constants";
import Log from "../../Log";

const saveTorrent = (dispatch) => async (magnetUri, callback = null) => {
  Log.action("saveTorrent");

  const status = { error: false };

  try {
    Log.info("Saving torrent - Torrent Magnet");
    const response = await api.post("api/torrent", { magnetUri });
    Log.info("Saved torrent - Torrent Magnet");

    Log.defination.show(Log.defination.def.api.torrent.api_torrent.post);
    const payload = response.data.api;

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Torrent.SAVE_TORRENT,
      payload,
    });
  } catch (err) {
    Log.multi("Fetching videos error!", err.message).Error();
    status.error = true;
  }

  if (callback) callback(status);
};

const downloadTorrent = (dispatch) => async (torrentDatabaseId, callback = null) => {
  Log.action("downloadTorrent");

  const status = { error: false };

  try {
    Log.info("Downloading torrent - Sending Torrent Database Id");
    const response = await api.get(`api/torrent/${torrentDatabaseId}`);
    Log.info("Downloaded torrent - Sending Torrent Database Id");

    Log.defination.show(Log.defination.def.api.torrent.api_torrent.get);
    const payload = "Torrent download started";

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Torrent.DOWNLOAD_TORRENT,
      payload,
    });
  } catch (err) {
    Log.multi("Fetching torrents error!", err.message).Error();
    status.error = true;
  }

  if (callback) callback(status);
};

// Register Action
const torrent = () => ({ saveTorrent, downloadTorrent });

export default torrent;
