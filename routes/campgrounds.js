const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

// INDEX
router.get('/', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    }
    res.render('campgrounds/index', { campgrounds: allCampgrounds });
  });
});

// CREATE
router.post('/', isLoggedIn, (req, res) => {
  // ES6 destructuring:
  // const {name, image} = req.body.{}
  // when the property and variable are the same, ES6 lets you use the following
  // (instead of {name: name})
  // const newCampground = { name, image };

  Campground.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  }, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/campgrounds');
  });
});

// NEW
router.get('/new', isLoggedIn, (req, res) => res.render('campgrounds/new'));

// SHOW
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    }
    res.render('campgrounds/show', {
      campground: foundCampground,
    });
  });
});

// checks if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;