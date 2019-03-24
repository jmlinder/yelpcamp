const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware/index.js');

// New comment
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash('error', err);
    } else {
      res.render('comments/new', { campground });
    }
  });
});

// Create comment
router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err || !campground) {
      req.flash('error', 'Campground not found');
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err || !comment) {
          req.flash('error', 'Something went wrong.');
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          //save comment
          campground.comments.push(comment);
          campground.save();
          req.flash('success', 'Successfully added comment.');
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// Edit comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err || !campground) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      Comment.findById(req.params.comment_id, (err, comment) => {
        if (err || !comment) {
          req.flash('error', 'Something went wrong.');
          res.redirect('back');
        } else {
          res.render('comments/edit', { campground_id: req.params.id, comment });
        }
      });
    }
  });
});

// Edit logic
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
    if (err || !comment) {
      req.flash('error', 'Something went wrong.');
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully edited comment.')
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// Delete comment
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      req.flash('error', err);
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully removed comment.')
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;