const { fs, config, log } = require("../required");
const { VideoModel } = require("../model");

module.exports.fetch = async () => {
  log.info("Video data fetching from database");
  const videos = await VideoModel.find({});
  log.info("Video data fetched from database");
  return videos;
};

module.exports.get = async (id) => {
  log.info(`Video is fetching from database - ID ${id}`);
  try {
    const video = await VideoModel.find({ _id: id });
    log.info("Video is fetched from database");
    return video.pop();
  } catch(err) {
    log.error(`Video fetch 'Failed' from database: ${err.message}`);
    return null;
  }
};

module.exports.save = async (
  Title,
  Name,
  Channel,
  User,
  Description,
  dir_VideoData,
  dir_Thumbnail,
  name_Thumbnail,
  hls_VideoData
) => {
  log.info("Video data saving to database");
  const server_url = config.constants().server.bind();
  const dir_ThumbnailData = dir_Thumbnail + "/" + name_Thumbnail;
  const fields = config.database().structure.model.videos._fields;

  fields.title = Title;
  fields.name = Name;
  fields.channel = Channel;
  fields.views = "0"; // TODO: view counter
  fields.user = User;
  fields.video_dir = dir_VideoData;
  fields.video_link = config.p2l_converter(server_url, dir_VideoData);
  fields.video_hls_link = hls_VideoData != null ? config.p2l_converter(server_url, hls_VideoData) : null;
  fields.thumbnail_dir = dir_ThumbnailData;
  fields.thumbnail_link = config.p2l_converter(server_url, dir_ThumbnailData);
  fields.thumbnail_buffer = new Buffer.from(fs.readFileSync(dir_ThumbnailData)).toString("base64");
  fields.description = Description;
  fields.show = true;
  fields.upload_at = "Year " + new Date().getFullYear();
  fields.updated_at = Date.now();
  fields.created_at = Date.now();

  const model = new VideoModel(fields);
  const saved = await model.save();
  log.info("Video data saved to database");
  return saved;
};

module.exports.update = async (_Id, Title, Name, dir_VideoData, dir_Thumbnail, name_Thumbnail, show, hls_VideoData) => {
  log.info("Video data updating to database");
  const server_url = config.constants().server.bind();
  const dir_ThumbnailData = !dir_Thumbnail || !name_Thumbnail ? null : dir_Thumbnail + "\\" + name_Thumbnail;
  const fields = config.database().structure.model.videos._fields;
  const fieldsKeys = Object.keys(fields);
  const updateFields = {};

  fields.title = Title;
  fields.name = Name;
  fields.channel = null;
  fields.views = null;
  fields.user = null;
  fields.video_dir = dir_VideoData;
  fields.video_link = config.p2l_converter(server_url, dir_VideoData);
  fields.video_hls_link = config.p2l_converter(server_url, hls_VideoData);
  fields.thumbnail_dir = dir_ThumbnailData;
  fields.thumbnail_link = config.p2l_converter(server_url, dir_ThumbnailData);
  fields.thumbnail_buffer = dir_ThumbnailData
    ? new Buffer.from(fs.readFileSync(dir_ThumbnailData)).toString("base64")
    : null;
  fields.show = show;
  fields.upload_at = null;
  fields.updated_at = Date.now();
  fields.created_at = null;

  fieldsKeys.forEach((value) => {
    if (fields[value] != null) {
      updateFields[value] = fields[value];
    }
  });

  await VideoModel.updateOne({ _id: _Id }, updateFields);
  log.info("Video data updated to database");
};
