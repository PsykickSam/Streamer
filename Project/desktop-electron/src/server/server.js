const path = require("path");
const app = require("electron").app;
const fastify = require("fastify");
const torrentStream = require("torrent-stream");
const getPort = require("get-port");
const logger = require("../logger").logger;

class Server {
  constructor() {
    this.isTrue = false;
    this.port = 9000;
    this.files = [];
    this.engine = null;
    this.magnet = "";
    this.isServerRunning = false;
    this.server = fastify({ logger: false });
    // magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent
  }

  execute(callback = null) {
    this.runEngine(callback);
  }

  break(callback = null) {
    this.closeEngine(callback);
    this.reset();
  }

  reset() {
    this.files = [];
    this.isTrue = false;
    this.magnet = "";
    this.port = 9000;
    this.engine = null;
    this.isServerRunning = false;
    this.server = null;
  }

  async generatePort() {
    this.port = await getPort();
    return this;
  }

  mixMagnet(magnet) {
    this.magnet = magnet;
    this.isTrue = this.magnet !== null;
    return this;
  }

  runEngine(callback = null) {
    if (!this.isTrue) {
      return this;
    }

    this.engine = torrentStream(this.magnet, {
      path: path.join(app.getPath("downloads"), "./storage/download"),
      tmp: path.join(app.getPath("downloads"), "./storage/tmp"),
    });

    this.engine.on("download", (bytes) => {});
    this.engine.on("error", (err) => {
      logger.error("Error on torrent engine!", err.message);
      this.isTrue = false;
    });
    this.engine.on("ready", () => {
      this.files = [];

      this.engine.files.forEach((file) => {
        this.files.push(file);
        file.createReadStream();
      });

      this.startServer();
      if (callback) {
        logger.info(
          "Saving Data:\n" +
            this.magnet +
            "\n" +
            this.engine.torrent.name +
            "\n" +
            JSON.stringify(this.files)
        );
        callback({
          magnet: this.magnet,
          name: this.engine.torrent.name,
          files: JSON.stringify(this.files),
        });
      }

      logger.info("Files are loaded, Total files: " + this.files.length);
    });

    return this;
  }

  closeEngine() {
    if (this.engine) {
      this.engine = null;
      this.stopServer();
    }
  }

  stopServer() {
    return new Promise((res, rej) => {
      this.server
        .close()
        .then(() => {
          this.isServerRunning = false;
          logger.info("Server closed successfully!");
          res();
        })
        .catch((err) => {
          logger.info("Server is not closed! " + err.message);
          rej();
        });
    });
  }

  async startServer() {
    if (!this.isTrue) {
      return;
    }

    if (this.isServerRunning) {
      return;
    }

    this.server.get("/", (req, rep) => {
      const jsonFiles = this.files.map((file, index) => ({
        name: file.name,
        index,
      }));

      rep.headers({ "Content-Type": "application/json" });
      rep.code(200).send(JSON.stringify(jsonFiles));
    });

    this.server.get("/render/:fileIndex", (req, rep) => {
      const file = this.files[req.params.fileIndex];
      const size = file.length;
      const range = req.headers.range || "bytes=0-";
      const positions = range.replace("bytes=", "").split("-");
      const start = parseInt(positions[0], 10);
      const end = positions[1] ? parseInt(positions[1], 10) : size - 1;
      const chunk = end - start + 1;
      const stream = file.createReadStream({ start, end });
      console.log("Streaming File: " + file.name);
      console.log("Range: " + start + " - " + end);

      rep.headers({
        "Content-Range": "bytes " + start + "-" + end + "/" + size,
        "Accept-Ranges": "bytes",
        "Content-Length": chunk,
        "Content-Type": "video/mp4",
      });
      rep.code(206);
      rep.send(stream);

      stream.on("error", (err) => {
        console.log("Stream error " + err.message);
      });
    });

    this.server.listen(this.port, (err, address) => {
      if (err) {
        logger.error("Error on server starting!", err.message);
        return;
      }

      this.isServerRunning = true;
    });
  }
}

module.exports = new Server();
