const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middlewareObj = {};

//checks if user owns the campground
middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err || !campground) {
        req.flash('error', 'Campground not found');
        res.redirect('/campgrounds');
      } else {
        // does user own this campground?
        if (campground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that.');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that.');
    res.redirect('back');
  }
}

//checks if user owns the comment
middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err) {
        req.flash('error', err.message);
        res.redirect('/campgrounds');
      } else {
        // does user own this comment?
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to edit this comment');
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

// checks if user is logged in
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that.');
  res.redirect('/login');
}

module.exports = middlewareObj