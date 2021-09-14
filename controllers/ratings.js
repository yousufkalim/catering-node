const Ratings = require("../models/ratings");
const Vendors = require("../models/vendors");
const moment = require("moment");

exports.publishRating = async (req, res) => {
  try {
    const { username, rating, comment, vendorId, ip } = req.body;

    const vendorInDb = await Vendors.findById(vendorId).populate("ratings");
    if (!vendorInDb) return res.status(404).send("Vendor does not exist");

    const now = new moment();
    let ratingInDb = await Ratings.find({ ip_address: ip });
    ratingInDb = ratingInDb.reverse();
    ratingInDb = ratingInDb[0];
    if (
      ratingInDb &&
      moment.duration(now.diff(new moment(ratingInDb.createdAt))).as("hours") <
        24
    ) {
      return res.status(400).send("You cannot Post another comment");
    }

    const newRating = new Ratings({
      username,
      rating,
      comment,
      vendor: vendorId,
      ip_address: ip,
    });
    await newRating.save();

    let totalRating = rating;
    vendorInDb.ratings.forEach((item) => {
      totalRating += item.rating;
    });

    vendorInDb.ratings.push(newRating._id);
    vendorInDb.final_rating = Math.floor(
      totalRating / vendorInDb.ratings.length
    );
    await vendorInDb.save();

    res.status(200).json({ msg: "ok", review: newRating });
  } catch (error) {
    console.log("Error ----> ", error);
    res.status(500).send("Something Failed");
  }
};
