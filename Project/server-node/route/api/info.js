const { router, log } = require("../../required");

router.get("/info/version", (req, res) => {
  log.info("API: Send - Server Version");

  // Retrive Version
  res.json({ version: "0.0.1" });
});

module.exports = router;
