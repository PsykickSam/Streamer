const { express, http, path, socket, cors, log, mongoose, config, bodyParser } = require("./required");
const starter = require("./starter");
const appSocket = require("./socket/socket");
log.info("Required imports imported successfully");

// Variables
const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};
log.info("Variable initialized successfully");

// Startup
starter.folderCreator();
log.info("Startup setup done successfully");

// Router
const route = require("./route/route");
log.info("Routes imported successfully");

// Setup
const app = express();
const server = http.createServer(app);
const io = socket.listen(server);
log.info("Initial setup done successfully");

// Database
mongoose.connect(config.database().database.mongo.bind(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
log.info("MongoDB loaded successfully");

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/storage/video/videos", express.static(path.join(__dirname, "/storage/video/videos")));
app.use("/storage/audio/audios", express.static(path.join(__dirname, "/storage/audio/audios")));
app.use("/storage/thumbnail/thumbnails", express.static(path.join(__dirname, "/storage/thumbnail/thumbnails")));
app.use(express.static(path.join(__dirname, "public")));
log.info("Middleware loaded successfully");

// Routes
app.use("/", route);
log.info("Routes are initializer successfully");

// Socket
appSocket.run(io);
log.info("Socket started successfully");

server.listen(config.server().local.port, () => {
  log.info(`Listening on PORT ${config.server().local.port} - {Socket Attached}`);
});
