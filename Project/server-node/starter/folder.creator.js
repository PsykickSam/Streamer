const { https, fs, path, config, log } = require("../required");

const createFolder = (p, s, c = null) => {
  if (!fs.existsSync(p)) {
    log.info(`'${s}' folder not exists, Creating new '${s}' folder`);
    try {
      fs.mkdirSync(p);
      log.info(`'${s}' folder created successfully`);
    } catch (err) {
      log.info(`'${s}' folder failed to create: ` + err.message);
    }
  } else {
    log.info(`'${s}' folder is already exists`);
  }

  if (c) c();
};

const folderCreator = () => {
  const root = config.directory().root;

  const storage = path.join(root, config.file().locations.root.storage.source());
  const video = path.join(storage, config.file().locations.child.video.source);
  const videos = path.join(video, config.file().locations.child.video.videos);
  const tempvi = path.join(video, config.file().locations.child.temp.source);
  const thumbnail = path.join(storage, config.file().locations.child.thumbnail.source);
  const thumbnails = path.join(thumbnail, config.file().locations.child.thumbnail.thumbnails);
  const nothumbnail = path.join(thumbnail, config.file().locations.child.thumbnail.no_thumbnail);
  const tempth = path.join(thumbnail, config.file().locations.child.temp.source);
  const torrent = path.join(storage, config.file().locations.child.torrent.source);
  const torrents = path.join(torrent, config.file().locations.child.torrent.torrents);
  const tempto = path.join(torrent, config.file().locations.child.temp.source);

  log.info("'Storage' Path: " + storage);
  log.info("'Video' Path: " + video);
  log.info("'Videos' Video Path: " + videos);
  log.info("'Temp' Video Path: " + tempvi);
  log.info("'Thumbnail' Path: " + thumbnail);
  log.info("'No Thumbnail' Thumbnail Path: " + nothumbnail);
  log.info("'Thumbnails' Thumbnail Path: " + thumbnails);
  log.info("'Temp' Thumbnail Path: " + tempth);
  log.info("'Torrent' Path: " + torrent);
  log.info("'Torrents' Torrent Path: " + torrents);
  log.info("'Temp' Torrent Path: " + tempto);

  createFolder(storage, "Storage", () => {
    createFolder(video, "Video", () => {
      createFolder(videos, "Videos - Video");
      createFolder(tempvi, "Temp - Video");
    });
    
    createFolder(torrent, "Torrent", () => {
      createFolder(torrents, "Torrents - Torrent");
      createFolder(tempto, "Temp - Torrent");
    });

    createFolder(thumbnail, "Thumbnail", () => {
      createFolder(thumbnails, "Thumbnails - Thumbnail");
      createFolder(tempth, "Temp - Thumbnail");
      createFolder(nothumbnail, "No Thumbnail - Thumbnail", () => {
        const file = fs.createWriteStream(`${nothumbnail}/no-thumbnail.png`);
        https.get("https://vswga.org/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg", (res) => {
          res.pipe(file);
        });
      });
    });
  });
};

module.exports = folderCreator;
