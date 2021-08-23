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
    company_name: {
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
    facebook_page: {
      type: String,
      required: true,
    },
    instagram_page: {
      type: String,
      required: true,
    },
    business_type: {
      type: String,
      required: true,
    },
    is_delivering: {
      type: Boolean,
      required: true,
    },
    delivery_radius: {
      type: Number,
      required: true,
    },
    food_type: [{ type: String }],
    description: {
      type: String,
      required: true,
    },
    menu_image: {
      type: String,
      required: true,
    },
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    final_rating: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    dine_in_options: [
      {
        type: String,
        required: true,
      },
    ],
    max_people_limit: {
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
