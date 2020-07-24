const { express, log } = require("../required");

const web = require("./web/index");
const api = require("./api/index");

const router = express.Router();

// Web
Object.keys(web).forEach(key => {
  log.info(`WEB Route - ${key}`)
  router.use("/", web[key]);
})
// Api
Object.keys(api).forEach((key) => {
  log.info(`API Route - ${key}`)
  router.use("/api", api[key]);
});

module.exports = router;
