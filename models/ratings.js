const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    ip_address: {
      type: String,
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Vendor",
    },
  },
  { timestamps: true }
);

module.exports = model("Rating", ratingSchema);
