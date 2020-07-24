// Self
import Constants from "../../Constants";

const appReducer = (state, action) => {
  switch (action.type) {
    case Constants.Reducer.App.RETRIVE_SERVER_VERSION: {
      const serverVersion = action.payload.version;
      return { ...state, serverVersion };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
