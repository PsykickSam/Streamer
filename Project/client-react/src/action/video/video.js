import api from "../../api/api.axios";

// Self
import Constants from "../../Constants";
import Log from "../../Log";

const getListVideos = (dispatch) => async () => {
  Log.action("getListVideos");

  try {
    Log.info("Fetching from server - Videos List");
    const response = await api.get("api/video/videos");
    Log.info("Fetched from server - Videos List");

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Video.RETRIEVE_LIST_VIDEOS,
      payload: response.data,
    });
  } catch (err) {
    Log.multi("Fetching videos error!", err.message).Error();
  }
};

const getVideo = (dispatch) => async (id) => {
  Log.action("getVideo");

  try {
    Log.info("Fetching from server - Video");
    const response = await api.get("api/video/" + id);
    Log.info("Fetched from server - Video");

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.Video.RETRIEVE_ONE_VIDEO,
      payload: response.data,
    });
  } catch (err) {
    Log.multi("Fetching single video error!", err.message).Error();
  }
};

// Register Action
const video = () => ({ getListVideos, getVideo });

export default video;
