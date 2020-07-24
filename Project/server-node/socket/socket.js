const { fs, helper, config, log } = require("../required");
const { db } = require("../required.depend");
const socketFunctions = require("./socket.functions");

const main = (io) => {
  const locations = config.file().locations.child;
  const Files = [];

  io.sockets.on("connection", (socket) => {
    // log.info("New Socket Client Connected");

    socket.on("Start", (data) => {
      const { Id, Name, Size, Extension } = {
        Id: data["Id"],
        Name: data["Name"],
        Size: data["Size"],
        Extension: { Ext: data["Extension"] },
      };

      if (Extension.Ext != null) {
        Extension.Ext = Extension.Ext.toLowerCase();
      } else {
        Extension.Ext = ".mp4";
      }

      Files[Id] = {
        Name: Name,
        Extension: Extension.Ext,
        FullName: Name + Extension.Ext,
        TempName: helper.functionHelper.tempn_generator(Name).encode(),
        FileSize: Size,
        Video: "",
        Downloaded: 0,
      };

      const tempVideo = helper.functionHelper.path_binder(locations.video.string, locations.temp.source) + Files[Id].TempName;
      let place = 0;
      let percent = 0;

      log.info(`Temp Video Location: ${tempVideo}`);

      try {
        const stat = fs.statSync(tempVideo);

        if (stat.isFile()) {
          Files[Id].Downloaded = stat.size;
          place = stat.size / 524288;
          percent = (Files[Id].Downloaded / Size) * 100;
        }
      } catch (ex) {
        log.info("Creating a new file");
      }

      fs.open(tempVideo, "a", 0755, (err, fd) => {
        if (err) {
          log.error("Error on open file in Video - /temp\n" + err.message);
          return;
        }

        Files[Id].Handler = fd;
        socket.emit("MoreData", { Place: place, Percent: percent });
      });
      log.info("Video upload started!");
    });

    socket.on("Upload", (data) => {
      const { Id, Name, Video } = {
        Id: data["Id"],
        Name: data["Name"],
        Video: data["Video"],
      };

      Files[Id].Downloaded += Video.length;
      Files[Id].Video += Video;
      log.info(`Total uploaded: ${Files[Id].Downloaded}/${Files[Id].FileSize}`);

      if (Files[Id].Downloaded === Files[Id].FileSize) {
        fs.write(Files[Id].Handler, Files[Id].Video, null, "Binary", (err, Written) => {
          if (err) {
            debug("Error writing " + Files[Id].Name + " " + ex.message);
            return;
          }

          const dir_GeneratedName = helper.functionHelper.dirn_generator(Files[Id].Name);
          const dir_TempVideoData =
          helper.functionHelper.path_binder(locations.video.string, locations.temp.source) + Files[Id].TempName;
          const dir_Video = helper.functionHelper.path_binder(locations.video.string, locations.video.videos + dir_GeneratedName);
          const dir_VideoData = dir_Video + Files[Id]["FullName"];
          const dir_Thumbnail =
          helper.functionHelper.path_binder(locations.thumbnail.string, locations.thumbnail.thumbnails) + dir_GeneratedName;
          const dir_TempThumbnail = helper.functionHelper.path_binder(locations.thumbnail.string, locations.temp.source);
          const name_Thumbnail = Files[Id].Name + ".png";

          socketFunctions.videoMoveToDir(dir_Video, dir_TempVideoData, dir_VideoData, (err) => {
            if (err) {
              log.error("File move failed: " + err.message);
              return;
            }
            socket.emit("Finish", null);
            log.info("File moved!");

            socketFunctions.videoThumbnailGenerate(
              dir_VideoData, 
              dir_Thumbnail,
              dir_TempThumbnail,
              name_Thumbnail,
              async (err) => {
                if (err) {
                  log.error("Thumbnail generation failed! \n" + err.message);
                  return;
                }
                log.info("Thumbnail generated successfully");

                const saved = await db.video.save(
                  Files[Id].Name,
                  Files[Id].FullName,
                  "Channel", // TODO: Channel name
                  "User", // TODO: User
                  "Description",
                  dir_VideoData,
                  dir_Thumbnail,
                  name_Thumbnail,
                  null
                );

                socketFunctions.adaptiveVideoGenerate(dir_Video, dir_VideoData, Name, async (hls_VideoData) => {
                  await db.video.update(saved._id, null, null, null, null, null, null, hls_VideoData);
                  log.info(`Video proccessing finished: ${Files[Id].Name}`);
                });
              }
            );
          });
        });
      } else if (Files[Id].Video.length > 10485760) {
        log.info("Uploading...");

        fs.write(Files[Id].Handler, Files[Id].Video, null, "Binary", (err, Written) => {
          Files[Id].Video = "";
          const place = Files[Id].Downloaded / 524288;
          const percent = (Files[Id].Downloaded / Files[Id].FileSize) * 100;

          socket.emit("MoreData", { Place: place, Percent: percent });
        });
      } else {
        log.info("Uploading...");
        const place = Files[Id].Downloaded / 524288;
        const percent = (Files[Id].Downloaded / Files[Id].FileSize) * 100;

        socket.emit("MoreData", { Place: place, Percent: percent });
      }
    });

    socket.on("disconnect", () => {
      //log.info("Socket Client disconnected")
    });
  });
};

const socket = {
  run: (io) => main(io),
};

module.exports = socket;
