const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware/index.js');

// INDEX
router.get('/', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('back');
    }
    res.render('campgrounds/index', { campgrounds: allCampgrounds });
  });
});

// Create campground page
router.get('/new', middleware.isLoggedIn, (req, res) => res.render('campgrounds/new'));

// Create campground logic
router.post('/', middleware.isLoggedIn, (req, res) => {
  // ES6 destructuring:
  // const {name, image} = req.body.{}
  // when the property and variable are the same, ES6 lets you use the following
  // (instead of {name: name})
  // const newCampground = { name, image };
  Campground.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  }, (err, newlyCreated) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('back');
    }
    req.flash('success', 'Successfully added campground.');
    res.redirect('/campgrounds');
  });
});

// Show more info about campground
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err || !campground) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      res.render('campgrounds/show', { campground });
    }
  });
});

// Edit campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('back');
    } else {
      res.render('campgrounds/edit', { campground });
    }
  });
});

// Edit campground logic
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/campgrounds');
    } else {
      req.flash('success', 'Succesfully edited campground');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// Delete campground
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/campgrounds');
    } else {
      req.flash('success', 'Successfully removed campground.');
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;