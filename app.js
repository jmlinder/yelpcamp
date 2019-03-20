const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const seedDB = require('./seeds');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');

const app = express();

seedDB();
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // __dirname is the path of the current file
app.set('view engine', 'ejs');

// Passport configuration
app.use(require('express-session')({
  secret: 'Joe is awesome!',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

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
app.post('/campgrounds', isLoggedIn, (req, res) => {
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
app.get('/campgrounds/new', isLoggedIn, (req, res) => res.render('campgrounds/new'));

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
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground });
    }
  });
});

// POST
app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
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
//====================
// Auth Routes
//====================
// show register form
app.get('/register', (req, res) => {
  res.render('register');
});

// handle sign up logic
app.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  })
});

// show login form
app.get('/login', (req, res) => {
  res.render('login');
});

// app.post('/post', MIDDLEWARE, callback)
app.post('/login', passport.authenticate('local',
  {
    successRedirect: "/campgrounds",
    failureRedirect: '/login'
  }));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

// Checks if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, () => console.log('Server has started!'));
