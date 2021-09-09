// Init
const router = require("express").Router();
const { getPlacesFromQuery } = require("../controllers/places");

// Routes
router.get("/", getPlacesFromQuery);

// Export
module.exports = router;
