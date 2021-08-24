const Vendor = require("../models/vendors");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const fs = require("fs");

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

exports.updateVendor = async (req, res) => {
  try {
    const body = { ...req.body };

    const vendorInDb = await Vendor.findById(req.params._id);
    if (!vendorInDb) return res.status(404).send("Vendor Not Found");

    if (req.files["image"] && req.files["image"][0]) {
      body.image = req.files["image"][0].path;
    }
    if (req.files["menu_image"] && req.files["menu_image"][0]) {
      body.menu_image = req.files["menu_image"][0].path;
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params._id,
      {
        $set: body,
      },
      { new: true }
    );

    if (req.files["image"] && req.files["image"][0]) {
      fs.unlink(vendorInDb.image, (err) => {
        console.log(err);
      });
    }
    if (req.files["menu_image"] && req.files["menu_image"][0]) {
      fs.unlink(vendorInDb.menu_image, (err) => {
        console.log(err);
      });
    }

    res.status(200).send({ msg: "Vendor Updated", vendor });
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
