const path = require("path");

// TODO: Use 'Redis' db for configuration
class Config {
  // Bind path with target
  path_binder(str, target) {
    const sroot = this.constants().file.locations.root;
    const schild = this.constants().file.locations.child;

    if (schild.hasOwnProperty(str) === false) {
      return "";
    }

    const storage = sroot.storage.source(true);
    const source = schild[str].source;
    const bind = this.b2fs_converter(path.join(this.constants().dir.root, storage, source, target, "/"));

    return bind;
  }

  // Path to Link converter
  p2l_converter(link, path) {
    if (!path) return null;

    // Path to Link converter
    const slash = process.platform === "win32" || path.includes("\\") ? "\\" : "/";
    const sroot = this.constants().file.locations.root;
    const storage = sroot.storage.source(false);
    const actualPath = [];
    const splitPath = path.split(slash);

    splitPath.forEach((split) => {
      if (storage === split || actualPath.length !== 0) {
        actualPath.push(split);
      }
    });

    return link + actualPath.join("/");
  }

  // Backward to Forward slash converter
  b2fs_converter(path) {
    if (path.includes("\\")) {
      const path_array = path.split("\\");
      return path_array.join("/");
    }

    return path;
  }

  // Directory name generator
  dirn_generator(str) {
    const divider = "__";
    const charnumStr = str.replace(/[^a-zA-Z0-9]/g, "");
    const updateCase = charnumStr.toUpperCase();
    const generate = updateCase + divider + Date.now();
    return generate;
  }

  // Temp name generator
  tempn_generator(str, channel = "Channel") {
    const temp_divider = "___temp__";
    const temp_fix = `${temp_divider}${channel}`; // TODO: Add username and update

    return {
      encode: () => {
        return `${str}${temp_fix}`;
      },
      decode: () => {
        return str.substr(0, str.length - (str.length - str.lastIndexOf(temp_divider)));
      },
    };
  }

  database() {
    return {
      database: {
        mongo: {
          type: "MongoDB",
          db_name: "streamer_db",
          url: "mongodb://localhost/",
          bind: () => {
            const mongo = this.database().database.mongo;
            return mongo.url + mongo.db_name;
          },
        },
        postgres: {},
      },
      structure: {
        model: {
          videos: {
            _name: "videos",
            _fields: {
              title: String,
              name: String,
              channel: String,
              views: String,
              user: String,
              video_dir: String,
              video_link: String,
              video_hls_link: String,
              thumbnail_dir: String,
              thumbnail_link: String,
              thumbnail_buffer: String,
              description: String,
              show: Boolean,
              upload_at: String,
              updated_at: Date,
              created_at: Date,
            },
            _api: {
              id: String,
              title: String,
              channel: String,
              views: String,
              user: String,
              video: String,
              hls: Boolean,
              thumbnail: String,
              uploaded: String,
            },
          },
          torrents: {
            _name: "torrents",
            _fields: {
              magnet: String,
              name: String,
              hash: String,
              files: Array,
              user: String, // User ID
              updated_at: Date,
              created_at: Date,
            },
            _api: {
              id: String,
              magnet: String,
              name: String,
              hash: String,
              files: Array,
            },
          },
        },
        retrive_fields: (name) => {
          const model = this.database().structure.model;
          let mkey = "";

          Object.keys(model).forEach((key) => {
            if (key === name) {
              mkey = key;
              return;
            }
          });

          return mkey === "" ? null : model[mkey]._fields;
        },
      },
      bind: {
        api: {
          video: (videos, wantArray = false) => {
            if (!(videos instanceof Array)) {
              videos = [videos];
            }

            const videosList = [];
            videos.forEach((video) => {
              const api = this.database().structure.model.videos._api;

              api.id = video.id; // TODO: Encryprt the id for url
              api.title = video.title;
              api.channel = video.channel;
              api.views = video.views;
              api.user = video.user;
              api.video = video.video_hls_link === null ? video.video_link : video.video_hls_link;
              api.hls = video.video_hls_link === null ? false : true;
              api.thumbnail = video.thumbnail_buffer;
              api.uploaded = video.upload_at;

              videosList.push(api);
            });

            return videosList.length === 1 && !wantArray ? videosList.pop() : videosList;
          },
          torrent: (torrents) => {
            const torrentList = [];
            if (!(torrents instanceof Array)) {
              torrents = [torrents];
            }

            torrents.forEach((torrent) => {
              const api = this.database().structure.model.torrents._api;

              api.id = torrent.id; // TODO: Encryprt the id for url
              api.magnet = torrent.magnet;
              api.name = torrent.name;
              api.files = torrent.files;

              torrentList.push(api);
            });

            return torrentList.length === 1 ? torrentList.pop() : torrentList;
          },
        },
      },
    };
  }

  media() {
    return {
      resolutions: {
        360: { p: 360, w: 640, h: 360, bv: "800k", maxrate: "856k", bufsize: "1200k", ba: "96k" }, // 360p
        480: { p: 480, w: 842, h: 480, bv: "1400k", maxrate: "1498k", bufsize: "2100k", ba: "128k" }, // 480p
        720: { p: 720, w: 1280, h: 720, bv: "2800k", maxrate: "2996k", bufsize: "4200k", ba: "128k" }, // 720p
        1080: { p: 1080, w: 1920, h: 1080, bv: "5000k", maxrate: "5350k", bufsize: "7500k", ba: "192k" }, // 1080p
        1440: { p: 1440, w: 2560, h: 1440, bv: "5000k", maxrate: "5350k", bufsize: "7500k", ba: "192k" }, // 1440p / 2k // Update
        2160: { p: 2160, w: 3840, h: 2160, bv: "5000k", maxrate: "5350k", bufsize: "7500k", ba: "192k" }, // 2160p / 4k // Update
        4320: { p: 4320, w: 7680, h: 4320, bv: "5000k", maxrate: "5350k", bufsize: "7500k", ba: "192k" }, // 4320p / 8k // Update
      },
      hls_playlist_info: {
        360: { p: 360, w: 640, h: 360, bandwidth: 800000 }, // 360p
        480: { p: 480, w: 842, h: 480, bandwidth: 1400000 }, // 480p
        720: { p: 720, w: 1280, h: 720, bandwidth: 2800000 }, // 720p
        1080: { p: 1080, w: 1920, h: 1080, bandwidth: 5000000 }, // 1080p
        1440: { p: 1440, w: 2560, h: 1440, bandwidth: 10000000 }, // 1440p / 2k // Update
        2160: { p: 2160, w: 3840, h: 2160, bandwidth: 15000000 }, // 2160p / 4k // Update
        4320: { p: 4320, w: 7680, h: 4320, bandwidth: 30000000 }, // 4320p / 8k // Update
      },
      retrive_vid_resolutions: (progressiveScan) => {
        const resolutions = this.media().resolutions;
        const resolutions_list = [];
        const keys = Object.keys(resolutions);

        for (const key of keys) {
          resolutions_list.push(resolutions[key]);

          if (resolutions[key].p === progressiveScan) {
            return resolutions_list;
          }
        }

        return null;
      },
    };
  }

  socket() {
    return {
      key: {
        video: {
          STATE_START: "VIDEO_STATE_START",
          STATE_UPLOAD_DATA: "VIDEO_STATE_UPLOAD_DATA",
          STATE_UPLOAD_MORE_DATA: "STATE_UPLOAD_MORE_DATA",
          STATE_UPLOAD_FINISH: "VIDEO_STATE_UPLOAD_FINISH",
        },
      },
    };
  }

  constants() {
    return {
      server: {
        type: "local",
        local_url: "http://localhost",
        local_port: "4000",
        global_url: "",
        global_port: "",
        bind: () => {
          const server = this.constants().server;
          const type = this.constants().server.type;

          if (type === "global") {
            return `${server.global_url}:${server.global_port}/`;
          }

          return `${server.local_url}:${server.local_port}/`;
        },
      },
      secret: {
        cipher_key: "secretsecretsecretsecretsecretse",
      },
      dir: {
        root: path.join(__dirname, "/../"),
        config: __dirname,
        route: path.join(__dirname, "/../route/"),
        route_api: path.join(__dirname, "/../route/api"),
        route_web: path.join(__dirname, "/../route/web/"),
        public: path.join(__dirname, "/../public/"),
        log: path.join(__dirname, "/../log/"),
        db: path.join(__dirname, "/../db/"),
        model: path.join(__dirname, "/../model/"),
        socket: path.join(__dirname, "/../socket/"),
        storage: path.join(__dirname, "/../storage/"),
        utils: path.join(__dirname, "/../utils/"),
        starter: path.join(__dirname, "/../starter/"),
        annotation: path.join(__dirname, "/../annotation/"),
      },
      log: {
        show: true,
      },
      file: {
        locations: {
          root: {
            storage: {
              source: (slash = false) => {
                return slash ? "/storage/" : "storage";
              },
            },
          },
          child: {
            temp: {
              string: "temp",
              source: "temp/",
            },
            video: {
              string: "video",
              source: "video/",
              videos: "videos/",
            },
            thumbnail: {
              string: "thumbnail",
              source: "thumbnail/",
              thumbnails: "thumbnails/",
              no_thumbnail: "no_thumbnail/",
            },
            torrent: {
              string: "torrent",
              source: "torrent/",
              torrents: "torrents/",
              files: "files/",
              downloads: "downloads/",
              magnets: "magnets/",
            },
          },
        },
      },
    };
  }
}

module.exports = Config;
