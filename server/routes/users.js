const express = require('express');
const User = require('../models/User');
const { isLoggedIn } = require('../middlewares');
const { checkId } = require('../middlewares');
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const parser = require('../configs/cloudinary.js');
const cloudinary = require('cloudinary');

router.get('/profile',  (req,res,next) => {
  console.log(req.user)
  res.json(req.user);
})

router.put('/profile', isLoggedIn, (req,res,next) => {
  let updates = {
    username: req.body.username,
    // pictureUrl: req.body.pictureUrl, // done by "POST /api/users/pictures"
  }
  // If the user sends "newPassword" and "currentPassword", check if the "req.body.currentPassword" is correct and sets the new password with "req.body.newPassword"
  if (req.body.newPassword && req.body.currentPassword && req.body.newPassword !== "") {
    // bcrypt.compareSync compares a clear password with a hass password
    if (!bcrypt.compareSync(req.body.currentPassword, req.user.password)) {
      // create an error object to send to our error handler with "next()"
      next(new Error("Current password is wrong"))
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(req.body.newPassword, salt)
    updates.password = hashPass
  }
  User.findByIdAndUpdate(req.user._id, updates)
  .then(user => {
    res.json({
      success: true
    })
  })
})

router.delete('/users/:id', isLoggedIn, (req, res, next) => {
  console.log("DEBUG userDoc", req.params.id)
  let id = req.params.id
  User.findByIdAndDelete(id)
    .then(userDoc => {
      res.json({
        // !!myVariable converts truthy to true and falsy to false
        success: !!userDoc,
        user: userDoc,
        // message: "This is just a test!"
      })
    })
    .catch(err => next(err))
})

router.post('/picture', parser.single('picture'), (req, res, next) => {
  let id = req.user._id;
  cloudinary.v2.uploader.destroy(req.user.public_id, function(res){console.log(res)})
  User.findByIdAndUpdate(id, { imageURL: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;