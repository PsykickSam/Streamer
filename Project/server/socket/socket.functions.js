const {
  fs,
  ffmpeg,
  mapper,
  helper,
  async,
  config,
  log,
  object: { ThumbnailGenerator },
} = require("../required");

module.exports.videoMoveToDir = (dir_Video, dir_TempVideoData, dir_VideoData, callback) => {
  try {
    if (!fs.existsSync(dir_Video)) {
      fs.mkdirSync(dir_Video);
    }
    fs.renameSync(dir_TempVideoData, dir_VideoData);
    if (callback) callback(null); // No error occured
  } catch (ex) {
    if (callback) callback(ex);
  }
}; 
 
module.exports.videoThumbnailGenerate = (
  dir_VideoData,
  dir_Thumbnail,
  dir_TempThumbnail,
  name_Thumbnail,
  callback // param: (isError)
) => {
  if (!fs.existsSync(dir_Thumbnail)) {
    try {
      fs.mkdirSync(dir_Thumbnail);
    } catch (ex) {
      log.error("Thumbnail make folder failed: ", ex.message);
    }
  } else {
    log.info("Specified thumbnail path exists already");
  }
  log.info("Thumbnail folder is specified");

  const tg = new ThumbnailGenerator({
    sourcePath: dir_VideoData,
    thumbnailPath: dir_Thumbnail,
    tmpDir: dir_TempThumbnail,
  });
  log.info("Thumbnail object initialized");

  tg.generate({
    filename: name_Thumbnail,
    count: 1,
  })
    .then(() => {
      if (callback) callback(null); // No error occoured
    })
    .catch((ex) => {
      if (callback) callback(ex);
    });
};

module.exports.adaptiveVideoGenerate = (
  dir_Video,
  dir_VideoData,
  name,
  callback,
  onStart = null,
  onEnd = null,
  onError = null
) => {
  ffmpeg.ffprobe(dir_VideoData, (err, metadata) => {
    if (err) {
      log.error("Failed to get video information");
      log.error("Couldn't create adaptive bitrate video file");
      return;
    }

    const mappedMetadata = mapper.ffprobeDetailMapper(metadata);
    const vW = mappedMetadata.video.width;
    const vH = mappedMetadata.video.height;
    const vP = vH;
    const resolutions = config.media().retrive_vid_resolutions(vP);
    const hlsPlaylistInfo = config.media().hls_playlist_info;
    const hlsPlaylist = [];
    log.info(`HLS Conversion: Name: ${name} | Original Resolution: ${vW}x${vH}`);
    if (resolutions != null) {
      async.parallel(
        resolutions.map((resolution) => (callback) => {
          const query = helper.ffmpegQueryBuilder(resolution);
          const dir_P = `${dir_Video}/${resolution.p}`;

          hlsPlaylist.push(hlsPlaylistInfo[resolution.p]);
          helper.ffmpegHLSRunner(
            ffmpeg,
            query,
            dir_VideoData,
            dir_P,
            (cmd) => {
              log.info(`Started: Name: ${name} | Resolution: ${resolution.w}x${resolution.h}`);
              if (onStart) onStart(cmd);
            },
            () => {
              log.info(`Finished: Name: ${name} | Resolution: ${resolution.w}x${resolution.h}`);
              if (onEnd) onEnd();
              callback(null, resolution.p);
            },
            (ex) => {
              log.info(`Failed: Name: ${name} | Resolution: ${resolution.w}x${resolution.h}`);
              if (onError) onError(ex);
              callback(ex, null);
            }
          );
        }),
        (err, result) => {
          if (err) {
            log.error("Async parallel execution error: " + err.message);
          }
          log.info("Async parallel execution done");
          log.info("HLS conversion done: " + result.join("p, ") + "p");

          if (result.includes(vP)) {
            const hls_VideoData = helper.HLSPlaylistBuilder.init(fs, dir_Video).builder(hlsPlaylist).build();
            if (!hls_VideoData) {
              log.error(`Failed to create HLS Content: Folder: ${dir_Video}`);
            } else {
              if (callback) callback(hls_VideoData);
            }
          }
        }
      );
    }
  });
};
