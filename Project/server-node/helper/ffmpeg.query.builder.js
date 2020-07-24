const ffmpegQueryBuilder = ({w, h, bv, maxrate, bufsize, ba}) => {
  return [
    `-vf scale=w=${w}:h=${h}:force_original_aspect_ratio=decrease`,
    `-c:a aac`,
    `-ar 48000`,
    `-c:v h264`,
    `-profile:v main`,
    `-crf 20`,
    `-sc_threshold 0`,
    `-g 48`,
    `-keyint_min 48`,
    `-hls_time 4`,
    `-hls_playlist_type vod`,
    `-b:v ${bv}`,
    `-maxrate ${maxrate}`,
    `-bufsize ${bufsize}`,
    `-b:a ${ba}`,
    `-hls_segment_filename`,
  ];
};

module.exports = ffmpegQueryBuilder;
