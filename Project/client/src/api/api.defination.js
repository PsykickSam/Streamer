const _apidef = {
  api: {
    index: {},
    info: {},
    torrent: {
      api_torrent: {
        get: { param: ["id"], data: null, body: null, method: "get" },
        post: {
          param: null,
          data: ["magnetUri"],
          body: [["api", "->", "id", "magnet", "name", "files"]],
          method: "post",
        },
      },
    },
    video: {
      api_videos: { get: { param: null, data: null, body: null, method: "get" } },
      api_video: { get: { param: ["id"], data: null, body: null, method: "get" } },
      api_video_render: { get: { param: ["link"], data: null, body: null, method: "get" } },
    },
  },
};

export default _apidef;
