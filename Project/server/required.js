const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const ffmpeg = require("fluent-ffmpeg");
const async = require("async");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const parseTorrent = require("parse-torrent");

const ThumbnailGenerator = require("video-thumbnail-generator").default;
const Webtorrent = require("webtorrent");

const mapper = require("./mapper");
const helper = require("./helper");

const Log = require("./log/log");
const Config = require("./config/config");
const Color = require("./utils/color");

const router = new express.Router();
const config = new Config();
const log = new Log(config, Color);

log.special("Required point is loaded");

module.exports = {
  express,
  http,
  https,
  fs,
  path,
  ffmpeg,
  socket,
  cors,
  log,
  config,
  router,
  mongoose,
  mapper,
  helper,
  async,
  crypto,
  bodyParser,
  parseTorrent,
  object: {
    Webtorrent,
    ThumbnailGenerator,
    Color,
  },
};
