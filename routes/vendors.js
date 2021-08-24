// Init
const router = require("express").Router();
const {
  register,
  updateVendor,
  getSingleVendor,
  getFilteredVendors,
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
router.get("/filtered-vendors", getFilteredVendors);
router.get("/:_id", getSingleVendor);

// POST
router.post("/", [vendor, validateVendor, isValidated], register);

// PUT
router.put("/:_id", [vendor, validateUpdateVendor, isValidated], updateVendor);

// Export
module.exports = router;
