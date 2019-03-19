const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');

const app = express();

seedDB();
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // __dirname is the path of the current file
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('landing'));

// RESTful routing:
// INDEX  | /campgrounds     | GET  | shows all campgrounds
// NEW    | /campgrounds/new | GET  | form to create new
// CREATE | /campgrounds     | POST | add new campground to DB
// SHOW   | /campgrounds/:id | GET  | shows info about one campground

// INDEX
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    }
    res.render('campgrounds/index', { campgrounds: allCampgrounds });
  });
});

// CREATE
app.post('/campgrounds', (req, res) => {
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
app.get('/campgrounds/new', (req, res) => res.render('campgrounds/new'));

// SHOW
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    }
    res.render('campgrounds/show', {
      campground: foundCampground,
    });
  });
});

// ==========================
// COMMENTS ROUTES
// ==========================

// NEW
app.get('/campgrounds/:id/comments/new', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground });
    }
  });
  // res.render('comments/new');
});

// POST
app.post('/campgrounds/:id/comments', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});


app.listen(3000, () => console.log('Server has started!'));
