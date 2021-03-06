const express = require("express");
const Spot = require("../models/Spot");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// import mapboxgl from "mapbox-gl/dist/mapbox-gl";

// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const geocodingClient = mbxGeocoding({
//   accessToken:
//     "pk.eyJ1IjoiYW5uYS1kb3JzY2giLCJhIjoiY2pvenlweTBxMDEwcDN2cDZnODE1b3drbiJ9.90Qojat5txlmFGgTnbP9PA"
// });

router.get("/", (req, res, next) => {
  Spot.find()
    .populate("_owner", "username") // Populate on the field 'username' and '_id' (default) ==> avoid displaying the hash password that could be a security issue
    .then(spots => {
      res.json(spots);
    })
    .catch(err => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {
  let {
    selectedOption,
    title,
    description,
    rating,
    lng,
    lat,
    address,
    tag,
    pictureUrl
  } = req.body;
  let _owner = req.user._id;
  if (!description || !rating || !lng || !lat || !selectedOption) {
    return next(new Error("You have to send: description, rating, lng, lat"));
  }
  Spot.create({
    selectedOption,
    title,
    description,
    rating,
    address,
    pictureUrl,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    },
    /* tagName, */
    _owner,
    /* pictureUrl, */
    tag
  })
    .then(spot => {
      res.json({
        success: true,
        spot
      });
    })
    .catch(err => next(err));
});

// THIS IS THE VALUE THAT WILL ALWAYS BE IN THE MIDDLE. DO WHAT YOU WANT WITH THAT INFORMATION
//if (style=="transform: translate(-50%, -50%) translate(212px, 186px)")

// trying something

module.exports = router;
