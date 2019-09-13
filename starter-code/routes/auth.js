const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');
const uploadCloud = require('../config/cloudinary')
const multer =require('multer')


router.get('/signup', (req, res) => {
  res.render('sign-up');
});

router.post('/signup', uploadCloud.single('photo'),async (req,res) => {
  let {username, password} = req.body;

  if (!password) return res.render('sign-up', {err: 'Empty password'});
  if (!username) return res.render('sign-up', {err: 'Empty username'});
  const salt = 10;
  const bsalt = bcrypt.genSaltSync(salt);
  password = bcrypt.hashSync(password, bsalt);
  console.log(password);

   let {url:imgPath,originalname:imgName}=req.file
   console.log(imgPath, imgName);
   
   User.create({username,password,imgPath,imgName})
  .then(() => {
    res.redirect('/auth/login')
  })
  .catch(err => {
    res.json(err);
  })
});




router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect("/");
    } else {
      res.render("login", {
        errorMessage: "Incorrect password"
      });
    }
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;