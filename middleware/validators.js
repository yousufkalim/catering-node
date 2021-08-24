// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// Vendor Validation
exports.validateVendor = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.").notEmpty().trim(),
  check("company_name", "Company Name is required.").notEmpty().trim(),
  check("phone", "Phone is required.").notEmpty().trim(),
  check("website", "Website is required.").notEmpty().trim(),
  check("facebook_page", "Facebook Link is required.").notEmpty().trim(),
  check("instagram_page", "Instagram Link is required.").notEmpty().trim(),
  check("business_type", "Business Type is required.").notEmpty().trim(),
  check("is_delivering", "Delivery Check is required.").isBoolean(),
  check("delivery_radius", "Delivery Radius is required.")
    .notEmpty()
    .isNumeric(),
  check("food_type", "Food Type is required.").notEmpty(),
  check("description", "Description is required.").notEmpty().trim(),
  check("price", "Price is required.").isNumeric().notEmpty(),
  check("dine_in_options", "Dine In Options are required.").notEmpty(),
  check("max_people_limit", "Max People Limit is required.")
    .isNumeric()
    .notEmpty(),
  // check("address", "Address is required.").notEmpty(),
  check("address.lat", "Latitude is required.").notEmpty(),
  check("address.lng", "Longitude is required.").notEmpty(),
  check("address.city", "City is required.").notEmpty(),
  check("address.postal_code", "Postal Code is required.").notEmpty(),
  check("address.label", "Address Label is required.").notEmpty(),
];

// Example Validation
exports.validateExample = [
  check("name", "Name is required.").notEmpty().trim(),
  check("cnic", "CNIC is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("gender", "Gender is required.").notEmpty(),
  check("role", "Role is required.").notEmpty(),
  check("number", "Number is required.").notEmpty().trim(),
];

// Rating Validation
exports.validateRating = [
  check("username", "Name is required.").notEmpty().trim(),
  check("rating", "Rating is required.").isNumeric().notEmpty(),
  check("comment", "Comment is required.").notEmpty().trim(),
  check("ip", "IP is required.").notEmpty().trim(),
  check("vendorId", "Vendor is required.").notEmpty().trim(),
];

/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  } else {
    next();
  }
};
