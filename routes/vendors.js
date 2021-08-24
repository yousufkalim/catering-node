// Init
const router = require("express").Router();
const {
  register,
  updateVendor,
  getSingleVendor,
} = require("../controllers/vendors");
const {
  validateVendor,
  validateUpdateVendor,
  isValidated,
} = require("../middleware/validators");
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

// PUT
router.put("/:_id", [vendor, validateUpdateVendor, isValidated], updateVendor);

// Export
module.exports = router;
