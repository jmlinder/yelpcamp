const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground')

const app = express();

mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
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
    res.render('index', { campgrounds: allCampgrounds });
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
app.get('/campgrounds/new', (req, res) => res.render('new'));

// SHOW
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    }
    res.render('show', {
      campground: foundCampground,
    });
  });
});

app.listen(3000, () => console.log('Server has started!'));
