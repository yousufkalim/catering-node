// Init
const router = require("express").Router();

// All Routes
router.use("/example", require("./example"));
router.use("/vendors", require("./vendors"));
router.use("/ratings", require("./ratings"));

// Export
module.exports = router;
