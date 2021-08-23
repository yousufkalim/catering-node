const { Schema, model } = require("mongoose");

const vendorSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    facebookPage: {
      type: String,
      required: true,
    },
    instagramPage: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    isDelivering: {
      type: Boolean,
      required: true,
    },
    deliveryRadius: {
      type: Number,
      required: true,
    },
    foodType: [{ type: String }],
    description: {
      type: String,
      required: true,
    },
    menuImage: {
      type: String,
      required: true,
    },
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    finalRating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dineInOptions: {
      type: String,
      required: true,
    },
    maxPeopleLimit: {
      type: Number,
      required: true,
    },
    address: {
      lat: {
        type: String,
        required: true,
      },
      lng: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postal_code: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Vendor", vendorSchema);
