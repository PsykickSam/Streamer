const { router, log, fs, config } = require("../../required");
const { cipher, db } = require("../../required.depend");

/**
 * @RouteAPI       api_audios
 * @RouteMethod    get
 * @RouteParam     null
 * @RouteBody      null
 */
router.get("/audio/audios", async (req, res) => {
  log.info("API: Send - All the 'Videos' list");

  // TODO: Access Authentication
  // TODO: Fetch data from database
  const fetch = await db.video.fetch();
  const videos = config.database().bind.api.audio(fetch, true);

  res.json({ videos });
});

/**
 * @RouteAPI       api_audio
 * @RouteMethod    get
 * @RouteParam     :id
 * @RouteBody      null
 */
router.get("/audio/:id", async (req, res) => {
  log.info("API: Send - Single video info");
  if (Object.keys(req.params).indexOf("id") === -1) {
    res.json({ error: "Sorry! video ID is not provided or initialized!" });
    return;
  }

  const id = req.params.id;
  const dbVideo = await db.video.get(id);
  const video = config.database().bind.api.video(dbVideo);
  const encryptPath = cipher.encrypt(dbVideo.video_dir);
  if (!video.hls) {
    video.video = `${config.server().bind()}api/video/render/${encryptPath}`;
  }

  res.json({ video });
});

/**
 * @RouteAPI       api_render
 * @RouteMethod    get
 * @RouteParam     :link
 * @RouteBody      null
 */
router.get("/audio/render/:link", async (req, res) => {
  if (Object.keys(req.params).indexOf("link") === -1) {
    res.json({ error: "Sorry! audio ID is not provided or initialized!" });
    return;
  }

  log.info("Audio is start rendering");
  const link = req.params.link;
  const decrypt = cipher.decrypt(link);
  const path = decrypt;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res.status(416).send("Request range not satisfiable\n" + start + " - " + fileSize);
      return;
    }

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start} - ${end} / ${fileSize}`,
      "Accept-Range": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": `${fileSize}`,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

module.exports = router;
