var controls = [
  "play-large", // The large play button in the center
  "play", // Play/pause playback
  "progress", // The progress bar and scrubber for playback and buffering
  "current-time", // The current time of playback
  "duration", // The full duration of the media
  "mute", // Toggle mute
  "volume", // Volume control
  "captions", // Toggle captions
  "fullscreen", // Toggle fullscreen
  // "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
  // "restart", // Restart playback
  // "rewind", // Rewind by the seek time (default 10 seconds)
  // "fast-forward", // Fast forward by the seek time (default 10 seconds)
  // 'settings', // Settings menu
  // 'pip', // Picture-in-picture (currently Safari only)
  // 'airplay', // Airplay (currently Safari only)
];

const plyr = new Plyr("#player", { controls });
