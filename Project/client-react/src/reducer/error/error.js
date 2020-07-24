// Self
import Constants from "../../Constants";

const appReducer = (state, action) => {
  switch (action.type) {
    case Constants.Reducer.Error.ERROR_LOAD: {
      return { ...state, error: "" };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
