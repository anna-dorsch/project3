const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const parser = require("../configs/cloudinary.js");

router.post("/simple-picture", parser.single("picture"), (req, res, next) => {
  res.json({
    success: true,
    pictureUrl: req.file.url
  });
});

module.exports = router;
