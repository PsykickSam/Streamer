class HLSPlaylistBuilder {
  constructor(fs, name, dir_Video) {
    this.fs = fs;
    this.name = name == null ? "playlist.m3u8" : name;
    this.dir_Video = dir_Video;
    this.playlist = [];
  }

  static init(fs, dir_Video, name = null) {
    return new HLSPlaylistBuilder(fs, name, dir_Video);
  }

  builder(hlsPlaylist) {
    // hlsPlaylist { p: 1080p, h: 1920, w: 1080, bandwidth: 800000 }

    this.playlist.push(`#EXTM3U\n`);
    this.playlist.push(`#EXT-X-VERSION:3\n`);

    hlsPlaylist.map((data) => {
      this.playlist.push(`#EXT-X-STREAM-INF:BANDWIDTH=${data.bandwidth},RESOLUTION=${data.w}x${data.h}\n`);
      this.playlist.push(`${data.p}.m3u8\n`);
    });

    return this;
  }

  build() {
    try {
      const path = this.dir_Video + this.name;
      this.fs.writeFileSync(path, this.playlist.join(""));
      return path;
    } catch (err) {
      return null;
    }
  }
}

module.exports = {
  execute: (fs, dir_Video, name = null) => {
    return HLSPlaylistBuilder.init(fs, dir_Video, name);
  },
};
