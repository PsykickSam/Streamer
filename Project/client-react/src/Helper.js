const mediaFileTypeChecker = (str) => {
  const fileType = str.split(".").slice(-1).join("");
  const mediaExtensions = ["mp4", "mkv", "avi", "webm", "mp3"];

  return mediaExtensions.includes(fileType);
};

const mediaTypeCheker = (str) => {
  const fileType = str.split(".").slice(-1).join("");
  const audioExtensions = ["mp3"];
  const videoExtensions = ["mp4", "mkv", "avi", "webm"];

  // True for video, False for audio
  return audioExtensions.includes(fileType) ? false : videoExtensions.includes(fileType);
};

export const Helper = { mediaFileTypeChecker, mediaTypeCheker };
