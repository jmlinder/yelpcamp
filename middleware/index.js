const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middlewareObj = {};

//checks if user owns the campground
middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        res.redirect('/campgrounds');
      } else {
        // does user own this campground?
        if (campground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.send('you do not have permission to edit this campground');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

//checks if user owns the comment
middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err) {
        res.redirect('/campgrounds');
      } else {
        // does user own this comment?
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.send('you do not have permission to edit this comment');
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
  res.redirect('/login');
}

module.exports = middlewareObj