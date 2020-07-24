import api from "../../api/api.axios";

// Self
import Constants from "../../Constants";
import Log from "../../Log";

const showTorrent = (dispatch) => async (magnet_uri, callback = null) => {
  Log.action("showTorrent");
  const callbackParams = {};

  try {
    Log.info("Torrent showing & saving");
    const response = await api.post("api/torrent/show", { magnet_uri });
    Log.info("Torrent showed & saving");

    const fetched = response.data;
    const payload = fetched.error ? {} : fetched.data.torrent;

    callbackParams.error = fetched.error;
    callbackParams.data = null;
    callbackParams.message = fetched.message;

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Torrent.SHOW_TORRENT,
      payload,
    });
  } catch (err) {
    Log.multi("Fetching torrent error!", err.message).Error();
    callbackParams.error = true;
    callbackParams.data = null;
  }

  if (callback) callback(callbackParams);
};

const attachTorrent = (dispatch) => async (magnet_uri, callback = null) => {
  Log.action("attachTorrent");
  const callbackParams = {};

  try {
    Log.info("Torrent attaching");
    const response = await api.post(`api/torrent/attach/`, { magnet_uri });
    Log.info("Torrent attached");

    const fetched = response.data;
    const payload = "";

    callbackParams.error = fetched.error;
    callbackParams.data = null;
    callbackParams.message = fetched.message;

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Torrent.ATTACH_TORRENT,
      payload,
    });
  } catch (err) {
    Log.multi("Fetching torrents error!", err.message).Error();
    callbackParams.error = true;
    callbackParams.data = null;
  }

  if (callback) callback(callbackParams);
};

const detachTorrent = (dispatch) => async (magnet_hash, callback = null) => {
  Log.action("detachTorrent");
  const callbackParams = {};

  try {
    Log.info("Torrent detaching");
    const response = await api.delete(`api/torrent/detach/${magnet_hash}`);
    Log.info("Torrent detached");

    const fetched = response.data;
    const payload = "";

    callbackParams.error = fetched.error;
    callbackParams.data = null;
    callbackParams.message = fetched.message;

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Torrent.DETACH_TORRENT,
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
const torrent = () => ({ showTorrent, attachTorrent, detachTorrent });

export default torrent;
