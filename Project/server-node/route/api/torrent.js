const {
  router,
  log,
  config,
  helper,
  rimraf,
  parseTorrent,
  fs,
  object: { WebTorrent },
} = require("../../required");
const { db } = require("../../required.depend");

const locations = config.file().locations.child;
const status = { progress: 0, speed: 0, ratio: 0 };
const error = { message: "" };

let webtorrentInc = new WebTorrent();
let webtorrent = new WebTorrent();

// Functions
const timeControl = {
  on: (callback, wait = 30000) => {
    return setTimeout(callback, wait);
  },
  off: (timer) => {
    clearTimeout(timer);
  },
};

const webtorrentEventLoader = () => {
  webtorrent.on("error", (err) => {
    error.message = err.message;
    log.error("Torrent download - Error: " + error.message);
  });

  webtorrent.on("download", (bytes) => {
    status.progress = Math.round(webtorrent.progress * 100 * 100) / 100;
    status.speed = webtorrent.downloadSpeed;
    status.ratio = webtorrent.ratio;

    log.download(`Torrent - Progress: ${status.progress}, Speed: ${status.speed}, Ratio: ${status.ratio}`);
  });
};

log.info("WebTorrent event loading");
webtorrentEventLoader();
log.info("WebTorrent event loaded");

/**
 * @RouteAPI       api_torrent_show
 * @RouteMethod    post
 * @RouteParam     null
 * @RouteBody      magnet_uri
 */
router.post("/torrent/show", (req, res) => {
  log.info("API: Showing and saving torrent to database");

  const files = [];
  const fh_api = helper.functionHelper.api();
  const magnet_uri = req.body.magnet_uri;
  const magnet_hash = parseTorrent(magnet_uri).infoHash;
  const holder = { isDownloadable: true };
  const temp_dir = helper.functionHelper.path_binder(locations.torrent.string, locations.temp.source);
  const delete_dir = helper.functionHelper.path_binder(
    locations.torrent.string,
    locations.torrent.torrents + "User/" + locations.torrent.downloads + magnet_hash
  );

  // error check
  if (magnet_uri === undefined || magnet_uri === null) {
    log.info("API: Magnet Uri is undefined or null");

    const message = "Problem in (MagnetURL) & (...)";
    const json = fh_api.generate({}, message, true, fh_api.status.FAILED, fh_api.code.c500);

    res.json(json);
    return;
  }

  if (webtorrentInc.get(magnet_uri)) {
    webtorrentInc.remove(magnet_uri);
  }

  // remove same torrent
  // if (fs.existsSync(delete_dir)) {
  //   rimraf(delete_dir, () => {
  //     log.info(`Directory: ${magnet_hash}, was deleted`);
  //   });
  // } else {
  //   log.info(`Directory: ${magnet_hash}, doesn't exists`);
  // }

  log.info(`Magnet URI - Hash: ${parseTorrent(magnet_uri).infoHash}`);
  log.info("Torrent check timer is turned on");
  const timer = timeControl.on(() => {
    log.info("Torrent check timer is turned off");
    timeControl.off(timer);
    holder.isDownloadable = false;

    log.info("Torrent is not downloadable");
    const message = "Failed to load torrent files! Torrent is not downloadable.";
    const json = fh_api.generate({}, message, true, fh_api.status.FAILED, fh_api.code.c500);

    // webtorrentInc.destroy();
    res.json(json);
  }, 30000);

  log.info("Torrent is adding to the queue");
  webtorrentInc.add(magnet_hash, { path: temp_dir }, async (torrent) => {
    log.info("Torrent is added to the queue");
    if (torrent && holder.isDownloadable) {
      log.info("Torrent check timer is turned off");
      timeControl.off(timer);

      log.info("Saved torrent - Hash: " + torrent.infoHash);
      log.info("Saved torrent - Name: " + torrent.name);

      torrent.files.find((file) => {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        files.push({
          id,
          name: file.name,
          path: helper.functionHelper.b2fs_converter(file.path),
          length: file.length,
        });
      });

      torrent.destroy();
      // webtorrentInc.destroy();

      // TODO: Update 'User' with authenticated user
      const saved = await db.torrent.save(magnet_uri, torrent.name, files, torrent.infoHash, "User");
      const apiTorrent = config.database().bind.api.torrent(saved);
      const message = "Torrent files are loaded successfully.";
      const json = fh_api.generate({ torrent: apiTorrent }, message, false, fh_api.status.PASSED, fh_api.code.c200);

      res.json(json);
    } else {
      log.info("Torrent is not downloadable, It is cancelled previously");
    }
  });
});

/**
 * @RouteAPI       api_torrent_attach
 * @RouteMethod    get
 * @RouteParam     null
 * @RouteBody      magnet_uri
 */
router.post("/torrent/attach", async (req, res) => {
  log.info("API: Attach torrent for downloading");

  const magnet_uri = req.body.magnet_uri;
  const magnet_hash = parseTorrent(magnet_uri).infoHash;
  const fh_api = helper.functionHelper.api();
  const actual_dir = "User/" + locations.torrent.downloads + magnet_hash;
  const download_dir = helper.functionHelper.path_binder(
    locations.torrent.string,
    locations.torrent.torrents + actual_dir
  );

  try {
    webtorrent.remove(magnet_uri);
  } catch (err) {
    log.error("TorrentID removing failed");
  }

  if (!fs.existsSync(download_dir)) {
    fs.mkdirSync(download_dir);
  }

  log.info(`Magnet Hash: ${magnet_hash}`);
  log.info("Torrent check timer is turned on");
  const timer = timeControl.on(() => {
    log.info("Torrent check timer is turned off");
    timeControl.off(timer);

    log.info("Torrent is not downloadable due to 'Network Speed' or 'Others'");
    const message = "Torrent attached but due to 'Network Speed' or 'Other' problems.";
    const json = fh_api.generate({}, message, true, fh_api.status.FAILED, fh_api.code.c500);

    webtorrent.remove(magnet_uri);
    res.json(json);
  }, 40000);

  log.info("Torrent is start downloading");
  log.info("Torrent saving directory: " + actual_dir);
  webtorrent.add(magnet_uri, { path: download_dir }, (torrent) => {
    log.info("Torrent check timer is turned off");
    timeControl.off(timer);

    log.info("WEBTORRENT - Downloading - Params   Hash: " + magnet_hash);
    log.info("WEBTORRENT - Downloading - Retrived Hash: " + torrent.infoHash);

    const message = "Torrent is attached successfully, Now it is downloading.";
    const json = fh_api.generate({}, message, false, fh_api.status.PASSED, fh_api.code.c200);

    res.json(json);
  });
});

/**
 * @RouteAPI       api_torrent_detach
 * @RouteMethod    delete
 * @RouteParam     magnet_hash
 * @RouteBody      null
 */
router.delete("/torrent/detach/:magnet_hash", async (req, res, next) => {
  log.info("API: detach torrent from downloading");

  const magnet_hash = req.params.magnet_hash;
  const fh_api = helper.functionHelper.api();

  const torrent = webtorrent.get(magnet_hash);
  if (torrent === null) {
    const message = "This torrent magnet is not available";
    const json = fh_api.generate({}, message, true, fh_api.status.FAILED, fh_api.code.c500);
    res.json(json);
    return;
  }

  // rimraf(torrent.path, () => {
  //   log.info("Torrent file is deleted successfully, Torrent Hash: " + magnet_hash);
  // });

  webtorrent.remove(magnet_hash);
  const message = "Torrent magent is detached successfully";
  const json = fh_api.generate({}, message, false, fh_api.status.PASSED, fh_api.code.c200);
  res.json(json);
});

/**
 * @RouteAPI       api_torrent_render
 * @RouteMethod    get
 * @RouteParam     index, magnet_hash
 * @RouteBody      null
 */
router.get("/torrent/render/:index/:magnet_hash", async (req, res, next) => {
  log.info("API: Torrent file start streaming");

  const { magnet_hash, index } = req.params; // 'index' is file index, 'magnet_hash' is magnet uri hash
  const range = req.headers.range;
  const torrent = webtorrent.get(magnet_hash);
  const fh_api = helper.functionHelper.api();

  // check for torrent existance
  if (torrent === null || torrent === undefined) {
    log.info("Torrent of current magnet is not available");
    const message = "Torrent of current magnet is not available";
    const json = fh_api.generate({}, message, true, fh_api.status.FAILED, fh_api.code.c500);
    res.json(json);
    return;
  }

  const file = torrent.files[index];
  log.info(`Index: ${index}, Magnet Hash: ${magnet_hash}`);

  // check for video file
  log.info("Torrent - File type checking");
  if (!["mp4", "avi", "mkv", "webm", "mp3"].includes(file.name.split(".").slice(-1).pop())) {
    log.info("Torrent - File type is not streamable");
    const message = "This file no a media file to play";
    const json = fh_api.generate({}, message, true, fh_api.status.FAILED, fh_api.code.c500);
    res.json(json);
    return;
  }

  // check for range
  log.info("Torrent file - Range: " + range);
  if (!range) {
    const RangeException = new Error("Range is invalid!");
    RangeException.status = 416;

    return next(RangeException);
  }

  const positions = range.replace(/bytes=/, "").split("-");
  const size = file.length;
  const start = parseInt(positions[0], 10);
  const end = positions[1] ? parseInt(positions[1], 10) : size - 1;
  const chunk = end - start + 1;
  const stream = file.createReadStream({ start, end });

  log.info(`File - Start: ${start}, End: ${end}, Chunk: ${chunk}`);
  log.info("Stream create successfully");

  res.writeHead(206, {
    "Content-Range": "bytes " + start + "-" + end + "/" + size,
    "Accept-Ranges": "bytes",
    "Content-Length": chunk,
    "Content-Type": "video/mp4",
  });

  stream.pipe(res);

  // Events
  stream.on("error", (err) => {
    log.error("Streaming error, \n" + err.message);
    return next(err);
  });
});

module.exports = router;
