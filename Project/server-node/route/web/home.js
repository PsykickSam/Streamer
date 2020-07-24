const { router } = require("../../required");

router.get("/", (req, res) => {
  log.info("Index Page - Render Index Videos");
  res.render("index.html");
});

module.exports = router;
