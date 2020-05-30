import api from "../../api/api.axios";

// Self
import Constants from "../../Constants";
import Log from "../../Log";

const getServerVersion = (dispatch) => async () => {
  Log.action("getServerVersion");

  try {
    Log.info("Fetching from server - Server Version");
    const response = await api.get("api/info/version");
    Log.info("Featched from server - Server Version");

    Log.info("Ready to dispatch");
    dispatch({
      type: Constants.Reducer.App.RETRIVE_SERVER_VERSION,
      payload: response.data,
    });
  } catch (err) {
    Log.multi("Fetching Error!", err.message).Error();
  }
};

// Register Action
const app = () => ({ getServerVersion });

export default app;
