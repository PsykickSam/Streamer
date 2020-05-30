const ffmpegQueryBuilder = require("./ffmpeg.query.builder");
const ffmpegHLSRunner = require("./ffmpeg.hls.runner");
const hlsPlaylistBuilder = require("./hls.playlist.builder");
const functionHelper = require("./function.helper");

module.exports = (config, path) => ({
  ffmpegQueryBuilder,
  ffmpegHLSRunner,
  functionHelper: functionHelper(config, path),
  hlsPlaylistBuilder,
});
