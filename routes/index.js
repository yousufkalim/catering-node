// Init
const router = require("express").Router();

// All Routes
router.use("/vendors", require("./vendors"));
router.use("/ratings", require("./ratings"));
router.use("/places", require("./places"));

// Export
module.exports = router;
