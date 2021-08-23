// Init
const router = require("express").Router();

// All Routes
router.use("/example", require("./example"));
router.use("/vendors", require("./vendors"));

// Export
module.exports = router;
