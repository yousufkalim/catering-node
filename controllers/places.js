const axios = require("axios");
const placesKey = process.env.PLACES_API_SECRET;

// Get All
exports.getPlacesFromQuery = async (req, res) => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.name
      .split(" ")
      .join(
        "%"
      )}&inputtype=textquery&fields=formatted_address,name,geometry&key=${placesKey}&locationbias=point%3A39.5501%2C-105.7821`
    // locationbias=circle%3A500000%4039.5501%2C-105.7821`
  );
  res.status(200).json({ msg: "Ok", places: data.candidates });
};
