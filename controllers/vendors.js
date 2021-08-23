const Vendor = require("../models/vendors");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

// Register a Vendor
exports.register = async (req, res) => {
  try {
    const body = { ...req.body };

    const vendorInDb = await Vendor.findOne({ email: body.email });
    if (vendorInDb) return res.status(400).send("Email alread registered");

    if (!req.files["image"][0]) {
      return res.status(400).send("Vendor Image is required");
    } else if (!req.files["menu_image"][0]) {
      return res.status(400).send("Vendor Menu Image is required");
    }
    body.image = req.files["image"][0].path;
    body.menu_image = req.files["menu_image"][0].path;
    const hash = bcrypt.hashSync(body.password, salt); //Hashing Password
    body.password = hash; // Saving Hashed Password

    const vendor = new Vendor(body);
    await vendor.save();

    res.status(200).send({ msg: "Vendor Registered" });
  } catch (error) {
    console.log("Error ----> ", error);
    res.status(500).send("Something Failed");
  }
};

exports.getSingleVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params._id);
    if (!vendor) return res.status(404).send("Vendor does not exist");

    res.status(200).send({ msg: "Vendor Fetched", vendor });
  } catch (error) {
    console.log("Error ----> ", error);
    res.status(500).send("Something Failed");
  }
};
