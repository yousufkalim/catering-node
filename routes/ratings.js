// Init
const router = require("express").Router();
const { publishRating } = require("../controllers/ratings");
const { validateRating, isValidated } = require("../middleware/validators");

// Routes
// POST
router.post("/", [validateRating, isValidated], publishRating);

// Export
module.exports = router;
