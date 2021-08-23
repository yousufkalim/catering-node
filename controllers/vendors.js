const Vendor = require("../models/vendors");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

// Register a Vendor
exports.register = async (req, res) => {
  try {
    // const vendor = new Vendor(req.body);

    // const hash = bcrypt.hashSync(req.body.password, salt); //Hashing Password
    // vendor.password = hash; // Saving Hashed Password

    // await vendor.save();

    res.status(200).send({ msg: "Vendor Registered" });
  } catch (error) {
    console.log("Error ----> ", error);
    res.status(500).send("Something Failed");
  }
};
