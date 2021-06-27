const Constants = {
  Url: {
    serverUrl: "http://localhost:4000/",
    serverApiUrl: "http://localhost:4000/api/",
  },
  Reducer: {
    App: {
      RETRIEVE_SERVER_VERSION: "KEY_RETRIEVE_SERVER_VERSION",
    },
    Video: {
      RETRIEVE_LIST_VIDEOS: "KEY_RETRIEVE_LIST_VIDEOS",
      RETRIEVE_ONE_VIDEO: "KEY_RETRIEVE_ONE_VIDEO",
    },
    Audio: {
      RETRIEVE_LIST_AUDIOS: "KEY_RETRIEVE_LIST_AUDIOS",
      RETRIEVE_ONE_AUDIO: "KEY_RETRIEVE_ONE_AUDIO",
    },
    Error: {
      ERROR_LOAD: "KEY_ERROR_LOAD",
    },
    Torrent: {
      SHOW_TORRENT: "KEY_SHOW_TORRENT",
      ATTACH_TORRENT: "KEY_ATTACH_TORRENT",
      DETACH_TORRENT: "KEY_DETACH_TORRENT",
    }
  },
  Socket: {
    Key: {
      Video: {
        STATE_START: "VIDEO_STATE_START",
        STATE_UPLOAD_DATA: "VIDEO_STATE_UPLOAD_DATA",
        STATE_UPLOAD_MORE_DATA: "STATE_UPLOAD_MORE_DATA",
        STATE_UPLOAD_FINISH: "VIDEO_STATE_UPLOAD_FINISH",
      },
    },
  },
  Log: {
    logMode: true,
  },
};

export default Constants;
