const axios = require("axios");
const placesKey = process.env.PLACES_API_SECRET;

// Get All
exports.getPlacesFromQuery = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.name}&location=39.5501%2C-105.7821&components=country%3Aus&key=${placesKey}`
    );
    const placeIds = data.predictions.map((item) => item.place_id);

    let places = placeIds.map((item) =>
      axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item}&fields=name%2Cformatted_address%2Cgeometry&key=${placesKey}`
      )
    );

    places = (await Promise.all(places)).map((item) => item.data.result);

    res.status(200).json({ msg: "Ok", places });
  } catch (err) {
    console.log("err", err);
  }
};
