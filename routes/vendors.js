// Init
const router = require("express").Router();
const {
  register,
  updateVendor,
  getSingleVendor,
  getFilteredVendors,
  login,
  logout,
  confirmAuth,
} = require("../controllers/vendors");
const {
  validateVendor,
  validateUpdateVendor,
  isValidated,
} = require("../middleware/validators");
const { upload } = require("../middleware/multer");
const { checkAuth } = require("../middleware/checkAuth");

// Multer
const vendor = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "menu_image", maxCount: 1 },
]);

// Routes
// GET
router.get("/filtered-vendors", getFilteredVendors);
router.get("/check-auth", checkAuth, confirmAuth);
router.get("/logout", logout);
router.get("/:_id", getSingleVendor);

// POST
router.post("/login", login);
router.post("/", [vendor, validateVendor, isValidated], register);

// PUT
router.put("/:_id", [vendor, validateUpdateVendor, isValidated], updateVendor);

// Export
module.exports = router;
