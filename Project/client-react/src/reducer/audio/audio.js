// Self
import Constants from "../../Constants";

const audioReducer = (state, action) => {
  switch (action.type) {
    case Constants.Reducer.Audio.RETRIEVE_LIST_AUDIOS: {
      return { ...state, audios: action.payload.audios, audio: {} };
    }
    case Constants.Reducer.Audio.RETRIEVE_ONE_AUDIO: {
      return { ...state, audios: action.payload.audios, audio: action.payload.audio };
    }
    default: {
      return state;
    }
  }
};

export default audioReducer;
