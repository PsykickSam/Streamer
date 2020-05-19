const {
  router,
  log,
  config,
  object: { Webtorrent },
} = require("../../required");
const { db } = require("../../required.depend");
const { _apidef } = require("../../required.defination");

const locations = config.constants().file.locations.child;
const webtorrent = new Webtorrent();
const status = { progress: 0, speed: 0, ratio: 0 };
const error = { message: "" };

// Events
webtorrent.on("error", (err) => {
  error.message = err.message;
  log.error("Torrent download - Error: " + error.message);
});

webtorrent.on("download", (bytes) => {
  status.progress = Math.round(webtorrent.progress * 100 * 100) / 100;
  status.speed = webtorrent.downloadSpeed;
  status.ratio = webtorrent.ratio;

  log.info("Torrent download - Status: " + status.progress + " " + status.speed + " " + status.ratio);
});

/**
 * @RouteAPI       api_torrent
 * @RouteMethod    post
 * @RouteParam     null
 * @RouteBody      :magnetUri
 */
router.post("/torrent", (req, res) => {
  log.info("API: Saving torrent to database");

  const magnetUri = req.body.magnetUri;
  const files = [];

  try {
    webtorrent.remove(magnetUri);
  } catch (ex) {
    log.info("Torrent is not exists");
  }

  webtorrent.add(
    magnetUri,
    {
      path: config.path_binder(locations.torrent.string, locations.temp.source),
    },
    async (torrent) => {
      log.info("Saved torrent - Hash: " + torrent.infoHash);
      log.info("Saved torrent - Name: " + torrent.name);

      torrent.files.find((file) => {
        files.push({ name: file.name, path: config.b2fs_converter(file.path), length: file.length });
      });

      torrent.destroy();

      // TODO: Update 'User' with authenticated user
      const saved = await db.torrent.save(magnetUri, torrent.name, files, torrent.infoHash, "User");
      const api = config.database().bind.api.torrent(saved);

      log.defination(_apidef.api.torrent.api_torrent.post);
      res.json({ api });
    }
  );
});

/**
 * @RouteAPI       api_torrent
 * @RouteMethod    get
 * @RouteParam     null
 * @RouteBody      null
 */
router.get("/torrent/:id", async (req, res) => {
  log.info("API: Fetch torrent infomation");

  log.defination(_apidef.api.torrent.api_torrent.get);
  const id = req.param.id;
  const torrent = await db.torrent.fetch.byId(id);
  console.log(torrent);

  res.json({ message: "Torrent download started" });

  // const files = [];
  // const magnet =
  //   "magnet:?xt=urn:btih:94E05039DEEDBED65CCC8656A55A3A2B2BD256A6&dn=Ta%20Ra%20Rum%20Pum%20%282007%29%20720p%20HDRip%20x264%20AAC%20Link2Download&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce";

  // try {
  //   webtorrent.remove(magnet);
  // } catch (err) {
  //   log.error("TorrentID removing failed");
  // }

  // webtorrent.add(
  //   magnet,
  //   {
  //     path: config.path_binder(
  //       locations.torrent.string,
  //       locations.torrent.torrents + "User\\" + locations.torrent.downloads // TODO: User
  //     ),
  //   },
  //   (torrent) => {
  //     log.info("WEBTORRENT - Downloading: " + torrent.infoHash);

  //     torrent.files.find((file) => {
  //       log.info("FILE NAME: " + file.name);
  //       log.info("FILE PATH: " + config.b2fs_converter(file.path));

  //       files.push({ name: file.name, path: config.b2fs_converter(file.path), length: file.length });
  //     });

  //     res.json({ files });
  //   }
  // );
});

/**
 * @RouteAPI       api_torrent_render
 * @RouteMethod    get
 * @RouteParam     null
 * @RouteBody      null
 */
router.get("/torrent/render", (req, res, next) => {
  log.info("Torrent file start streaming");
  const magent =
    "magnet:?xt=urn:btih:94E05039DEEDBED65CCC8656A55A3A2B2BD256A6&dn=Ta%20Ra%20Rum%20Pum%20%282007%29%20720p%20HDRip%20x264%20AAC%20Link2Download&tr=http%3a%2f%2fsiena.crazyhd.com%2fannounce.php%3fpid%3d83dea680119f42ecf9a0858fc48789e6&tr=http%3a%2f%2fz.crazyhd.com%3a2710%2f83dea680119f42ecf9a0858fc48789e6%2fannounce";
  const filename = "Ta Ra Rum Pum (2007) 720p HDRip x264 AAC Link2Download.mkv";
  const range = req.headers.range;

  log.info("Torrent file - Range: " + range);

  if (!range) {
    const RangeException = new Error("Range is invalid!");
    RangeException.status = 416;

    return next(RangeException);
  }

  const torrent = webtorrent.get(magent);
  const positions = range.replace(/bytes=/, "").split("-");
  let file = {};

  for (i = 0; i < torrent.files.length; i++) {
    if (torrent.files[i].name === filename) {
      file = torrent.files[i];
    }
  }

  const size = file.length;
  const start = parseInt(positions[0], 10);
  const end = positions[1] ? parseInt(positions[1], 10) : size - 1;
  const chunk = end - start + 1;
  const stream = file.createReadStream({ start, end });

  const head = {
    "Content-Range": "bytes " + start + "-" + end + "/" + size,
    "Accept-Ranges": "bytes",
    "Content-Length": chunk,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, head);
  stream.pipe(res);

  // Events
  stream.on("error", (err) => {
    return next(err);
  });
});

module.exports = router;
