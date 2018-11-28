const express = require("express");
const Spot = require("../models/Spot");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

router.get("/", (req, res, next) => {
  Spot.find()
    .populate("_owner", "username") // Populate on the field 'username' and '_id' (default) ==> avoid displaying the hash password that could be a security issue
    .then(spots => {
      res.json(spots);
    })
    .catch(err => next(err));
});

router.post("/", isLoggedIn, (req, res, next) => {
  let { title, description, rating, lng, lat } = req.body;
  let _owner = req.user._id;
  if (!title || !description || !rating || !lng || !lat) {
    next(new Error("You have to send: title, description, rating, lng, lat"));
  }
  Spot.create({
    title,
    description,
    rating,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    },
    _owner
  })
    .then(spot => {
      res.json({
        success: true,
        spot
      });
    })
    .catch(err => next(err));
});

module.exports = router;
