// Init
const router = require("express").Router();
const {
  register,
  bulkRegister,
  updateVendor,
  getSingleVendor,
  getFilteredVendors,
  login,
  confirmAuth,
} = require("../controllers/vendors");
const {
  validateVendor,
  // validateUpdateVendor,
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
router.get("/:_id", getSingleVendor);

// POST
router.post("/login", login);
router.post("/", [vendor, validateVendor, isValidated], register);
router.post("/bulk", upload.single("caterers"), bulkRegister);

// PUT
// [vendor, validateUpdateVendor, isValidated];
router.put("/:_id", updateVendor);

// Export
module.exports = router;
