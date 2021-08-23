// Init
const router = require("express").Router();
const { register, getSingleVendor } = require("../controllers/vendors");
const { validateVendor, isValidated } = require("../middleware/validators");
const { upload } = require("../middleware/multer");

// Multer
const vendor = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "menu_image", maxCount: 1 },
]);

// Routes
// GET
router.get("/:_id", getSingleVendor);

// POST
router.post("/", [vendor, validateVendor, isValidated], register);

// Export
module.exports = router;
