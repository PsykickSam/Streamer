import api from "../../api/api.axios";

// Self
import Constants from "../../Constants";
import Log from "../../Log";

const saveTorrent = (dispatch) => async (magnetUri, callback = null) => {
  Log.action("saveTorrent");

  const callbackParams = { error: false, data: null };

  try {
    Log.info("Saving torrent - Torrent Magnet");
    const response = await api.post("api/torrent", { magnetUri });
    Log.info("Saved torrent - Torrent Magnet");

    Log.defination.show(Log.defination.def.api.torrent.api_torrent.post);
    const fetched = response.data;
    const payload = fetched.error ? {} : fetched.data.torrent;

    callbackParams.error = false;
    callbackParams.data = null;

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Torrent.SAVE_TORRENT,
      payload,
    });
  } catch (err) {
    Log.multi("Fetching torrent error!", err.message).Error();
    callbackParams.error = true;
    callbackParams.data = null;
  }

  if (callback) callback(callbackParams);
};

const downloadTorrent = (dispatch) => async (torrentDatabaseId, callback = null) => {
  Log.action("downloadTorrent");
  const callbackParams = { error: false, data: null };

  try {
    Log.info("Downloading torrent - Sending Torrent Database Id");
    const response = await api.get(`api//torrent/${torrentDatabaseId}`);
    Log.info("Downloaded torrent - Sending Torrent Database Id");

    console.log(response.data);

    callbackParams.error = false;
    callbackParams.data = null;

    Log.defination.show(Log.defination.def.api.torrent.api_torrent.get);
    const payload = "Torrent download started";

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Torrent.DOWNLOAD_TORRENT,
      payload,
    });
  } catch (err) {
    Log.multi("Fetching torrents error!", err.message).Error();
    callbackParams.error = true;
    callbackParams.data = null;
  }

  if (callback) callback(callbackParams);
};

// Register Action
const torrent = () => ({ saveTorrent, downloadTorrent });

export default torrent;
