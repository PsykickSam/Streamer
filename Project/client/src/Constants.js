const Constants = {
  Url: {
    serverUrl: "http://localhost:4000/",
    serverApiUrl: "http://localhost:4000/api/",
  },
  Reducer: {
    App: {
      RETRIVE_SERVER_VERSION: "KEY_RETRIVE_SERVER_VERSION",
    },
    Video: {
      RETRIVE_LIST_VIDEOS: "KEY_RETRIVE_LIST_VIDEOS",
      RETRIVE_ONE_VIDEO: "KEY_RETRIVE_ONE_VIDEO ",
    },
    Error: {
      ERROR_LOAD: "KEY_ERROR_LOAD",
    },
    Torrent: {
      SAVE_TORRENT: "KEY_SAVE_TORRENT",
      DOWNLOAD_TORRENT: "KEY_DOWNLOAD_TORRENT",
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
