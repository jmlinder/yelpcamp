const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const seedDB = require('./seeds');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');
const methodOverride = require('method-override');

const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

const app = express();

// App settings
// seedDB();
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // __dirname is the path of the current file
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

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

// Route logic
app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

// listen port
app.listen(3000, () => console.log('Server has started!'));
