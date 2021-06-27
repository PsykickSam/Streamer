// Self
import Constants from "../../Constants";

const videoReducer = (state, action) => {
  switch (action.type) {
    case Constants.Reducer.Video.RETRIEVE_LIST_VIDEOS: {
      return { ...state, videos: action.payload.videos, video: {} };
    }
    case Constants.Reducer.Video.RETRIEVE_ONE_VIDEO: {
      return { ...state, videos: action.payload.videos, video: action.payload.video };
    }
    default: {
      return state;
    }
  }
};

export default videoReducer;
