// Init
const router = require("express").Router();
const { register } = require("../controllers/vendors");
// const { validateExample, isValidated } = require("../middleware/validators");

// Routes
router.post("/", register);

// Export
module.exports = router;
