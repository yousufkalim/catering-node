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
      select: false,
    },
    company_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    facebook_page: {
      type: String,
    },
    instagram_page: {
      type: String,
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
    },
    food_type: [{ type: String }],
    description: {
      type: String,
      required: true,
    },
    menu_image: {
      type: String,
    },
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    final_rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
    },
    dine_in_options: {
      type: Boolean,
      required: true,
    },
    max_people_limit: {
      type: Number,
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
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Vendor", vendorSchema);
