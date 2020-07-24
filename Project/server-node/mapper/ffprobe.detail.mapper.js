const mapper = (metadata) => {
  // --- metadata -> streams [0 => Video, 1 => audio], format, chapters ---
  // ffprobe video detail metadata mapper

  const map = {};

  const streams = metadata.streams;
  const format = metadata.format;
  const chapters = metadata.chapters;
  const video = streams[0];
  const audio = streams[1];

  map.video = {
    index: video.index,
    codec_name: video.codec_name,
    codec_long_name: video.codec_long_name,
    profile: video.profile,
    codec_type: video.codec_type,
    codec_time_base: video.codec_time_base,
    codec_tag_string: video.codec_tag_string,
    codec_tag: video.codec_tag,
    width: video.width,
    height: video.height,
    coded_width: video.coded_width,
    coded_height: video.coded_height,
    has_b_frames: video.has_b_frames,
    sample_aspect_ratio: video.sample_aspect_ratio,
    display_aspect_ratio: video.display_aspect_ratio,
    pix_fmt: video.pix_fmt,
    level: video.level,
    color_range: video.color_range,
    color_space: video.color_space,
    color_transfer: video.color_transfer,
    color_primaries: video.color_primaries,
    chroma_location: video.chroma_location,
    field_order: video.field_order,
    timecode: video.timecode,
    refs: video.refs,
    is_avc: video.is_avc,
    nal_length_size: video.nal_length_size,
    id: video.id,
    r_frame_rate: video.r_frame_rate,
    avg_frame_rate: video.avg_frame_rate,
    time_base: video.time_base,
    start_pts: video.start_pts,
    start_time: video.start_time,
    duration_ts: video.duration_ts,
    duration: video.duration,
    bit_rate: video.bit_rate,
    max_bit_rate: video.max_bit_rate,
    bits_per_raw_sample: video.bits_per_raw_sample,
    nb_frames: video.nb_frames,
    nb_read_frames: video.nb_read_frames,
    nb_read_packets: video.nb_read_packets,
    tags: { language: video.tags.language, handler_name: video.tags.handler_name },
    disposition: {
      default: video.disposition.default,
      dub: video.disposition.dub,
      original: video.disposition.original,
      comment: video.disposition.comment,
      lyrics: video.disposition.lyrics,
      karaoke: video.disposition.karaoke,
      forced: video.disposition.forced,
      hearing_impaired: video.disposition.hearing_impaired,
      visual_impaired: video.disposition.visual_impaired,
      clean_effects: video.disposition.clean_effects,
      attached_pic: video.disposition.attached_pic,
      timed_thumbnails: video.disposition.timed_thumbnails,
    },
  };

  map.audio = {
    index: audio.index,
    codec_name: audio.codec_name,
    codec_long_name: audio.codec_long_name,
    profile: audio.profile,
    codec_type: audio.codec_type,
    codec_time_base: audio.codec_time_base,
    codec_tag_string: audio.codec_tag_string,
    codec_tag: audio.codec_tag,
    sample_fmt: audio.sample_fmt,
    sample_rate: audio.sample_rate,
    channels: audio.channels,
    channel_layout: audio.channel_layout,
    bits_per_sample: audio.bits_per_sample,
    id: audio.id,
    r_frame_rate: audio.r_frame_rate,
    avg_frame_rate: audio.avg_frame_rate,
    time_base: audio.time_base,
    start_pts: audio.start_pts,
    start_time: audio.start_time,
    duration_ts: audio.duration_ts,
    duration: audio.duration,
    bit_rate: audio.bit_rate,
    max_bit_rate: audio.max_bit_rate,
    bits_per_raw_sample: audio.bits_per_raw_sample,
    nb_frames: audio.nb_frames,
    nb_read_frames: audio.nb_read_frames,
    nb_read_packets: audio.nb_read_packets,
    tags: { language: video.tags.language, handler_name: video.tags.handler_name },
    disposition: {
      default: audio.disposition.default,
      dub: audio.disposition.dub,
      original: audio.disposition.original,
      comment: audio.disposition.comment,
      lyrics: audio.disposition.lyrics,
      karaoke: audio.disposition.karaoke,
      forced: audio.disposition.forced,
      hearing_impaired: audio.disposition.hearing_impaired,
      visual_impaired: audio.disposition.visual_impaired,
      clean_effects: audio.disposition.clean_effects,
      attached_pic: audio.disposition.attached_pic,
      timed_thumbnails: audio.disposition.timed_thumbnails,
    },
  };

  map.format = {
    filename: format.filename,
    nb_streams: format.nb_streams,
    nb_programs: format.nb_programs,
    format_name: format.format_name,
    format_long_name: format.format_long_name,
    start_time: format.start_time,
    duration: format.duration,
    size: format.size,
    bit_rate: format.bit_rate,
    probe_score: format.probe_score,
    tags: {
      major_brand: format.tags.major_brand,
      minor_version: format.tags.minor_version,
      compatible_brands: format.tags.compatible_brands,
      encoder: format.tags.encoder,
    },
  };

  map.chapters = chapters;

  return map;
};

module.exports = mapper;
