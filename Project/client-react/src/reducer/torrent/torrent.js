// Self
import Constants from "../../Constants";

const torrentReducer = (state, action) => {
  switch (action.type) {
    case Constants.Reducer.Torrent.SHOW_TORRENT: {
      return { ...state, torrent: action.payload };
    }
    case Constants.Reducer.Torrent.ATTACH_TORRENT: {
      return { ...state };
    }
    case Constants.Reducer.Torrent.DETACH_TORRENT: {
      return { ...state, torrent: {} };
    }
    default: {
      return state;
    }
  }
};

export default torrentReducer;
