import api from "../../api/api.axios";

// Self
import Constants from "../../Constants";
import Log from "../../Log";

const getListAudios = (dispatch) => async () => {
  Log.action("getListAudios");

  try {
    Log.info("Fetching from server - Audios List");
    const response = await api.get("api/audio/audios");
    Log.info("Fetched from server - Audios List");

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Audio.RETRIEVE_LIST_AUDIOS,
      payload: response.data,
    });
  } catch (err) {
    Log.multi("Fetching audios error!", err.message).Error();
  }
};

const getAudio = (dispatch) => async (id) => {
  Log.action("getAudio");

  try {
    Log.info("Fetching from server - Audio");
    const response = await api.get("api/audio/" + id);
    Log.info("Fetched from server - Audio");

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Audio.RETRIEVE_ONE_AUDIO,
      payload: response.data,
    });
  } catch (err) {
    Log.multi("Fetching single audio error!", err.message).Error();
  }
};

// Register Action
const audio = () => ({ getListAudios, getAudio });

export default audio;
