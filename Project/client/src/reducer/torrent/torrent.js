// Self
import Constants from "../../Constants";

const torrentReducer = (state, action) => {
  switch (action.type) {
    case Constants.Reducer.Torrent.SAVE_TORRENT: {
      return { ...state, torrent: action.payload };
    }
    case Constants.Reducer.Torrent.DOWNLOAD_TORRENT: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};

export default torrentReducer;
