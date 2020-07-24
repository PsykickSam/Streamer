const { router, log } = require("../../required");

router.get("/video", (req, res) => {
  log.info("Video Index");
  res.send("Showing Video Index Page");
});

module.exports = router;
