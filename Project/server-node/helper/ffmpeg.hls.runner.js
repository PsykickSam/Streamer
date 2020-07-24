const ffmpegHLSRunner = (ffmpeg, ffquery, input, output, onStart, onEnd, onError) => {
  ffmpeg(input, { timeout: 432000 })
    .addOptions(ffquery)
    .output(`${output}__%03d.ts`)
    .addOutput(`${output}.m3u8`)
    .on("start", (cmd) => {
      if (onStart) onStart(cmd);
    })
    .on("end", () => {
      if (onEnd) onEnd();
    })
    .on("error", () => {
      if (onError) onError();
    })
    .run();
};

module.exports = ffmpegHLSRunner;
