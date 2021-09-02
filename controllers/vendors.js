const Vendor = require("../models/vendors");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const passport = require("passport");
const fs = require("fs");
const geoLib = require("geo-lib");

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

exports.getFilteredVendors = async (req, res) => {
  try {
    const { restaurant_type, price, is_delivering, dine_in_options, lat, lng } =
      req.query;
    const condition = {};

    if (price) condition.price = { $lte: parseInt(price) };
    if (restaurant_type && restaurant_type.length > 0)
      condition.food_type = { $in: restaurant_type };
    if (is_delivering && is_delivering.length > 0)
      condition.is_delivering = is_delivering === "true" ? true : false;
    if (dine_in_options && dine_in_options.length > 0)
      condition.dine_in_options = dine_in_options === "true" ? true : false;

    let filteredVendors = [];
    const vendors = await Vendor.find(condition);
    vendors.forEach((item) => {
      let result = geoLib.distance({
        p1: { lat: parseInt(lat), lon: parseInt(lng) },
        p2: {
          lat: parseInt(item.address.lat),
          lon: parseInt(item.address.lng),
        },
      });
      const miles = result.distance / 1.609;
      if (miles <= 12) filteredVendors.push(item);
    });

    res.status(200).send({
      msg: "Vendors Fetched",
      vendors: filteredVendors,
    });
  } catch (error) {
    console.log("Error ----> ", error);
    res.status(500).send("Something Failed");
  }
};

exports.login = (req, res, next) => {
  // Authenticating with passport
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // If passport error
      return next(err);
    } else if (!user) {
      // If login error
      res.status(401).send(info.message);
    } else {
      // If Ok then logging in
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        // All done
        res.status(200).json({ success: true, user: user });
      });
    }
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logOut();
  res.status(200).json({
    success: true,
    message: "You are logged out successfully",
  });
};

exports.confirmAuth = (req, res) => {
  // If user authenticated
  res.status(200).send({ msg: "User Authenticated", user: req.user });
};
