const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image:
// 			'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	(err, campground) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('New campground created!');
// 			console.log(campground);
// 		}
// 	}
// );

// const campgrounds = [
// 	{
// 		name: 'Salmon Creek',
// 		image:
// 			'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Galts Gulch',
// 		image:
// 			'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Granite Hill',
// 		image:
// 			'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Slate Valley',
// 		image:
// 			'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Wolf Pass',
// 		image:
// 			'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Mountain Goat Ridge',
// 		image:
// 			'https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Razorfin Lodge',
// 		image:
// 			'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=croph=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Helvetica Park',
// 		image:
// 			'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Zaptail Range',
// 		image:
// 			'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Dodge Creek',
// 		image:
// 			'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Eagles Pass',
// 		image:
// 			'https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80'
// 	},
// 	{
// 		name: 'Cyclops Nest',
// 		image:
// 			'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
// 	}
// ];

app.get('/', (req, res) => res.render('landing'));

app.get('/campgrounds', (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log('An error occurred.');
			console.log(err);
		} else {
			res.render('campgrounds', { campgrounds: allCampgrounds });
		}
	});
});

app.post('/campgrounds', (req, res) => {
	const name = req.body.name;
	const image = req.body.image;

	// ES6 destructuring:
	// cosnt {name, image} = req.body

	// when the property and variable are the same, ES6 lets you use the following (instead of {name: name})
	// const newCampground = { name, image };

	// Create a new campground and save to database
	Campground.create({ name, image }, (err, newlyCreated) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', (req, res) => res.render('new'));

app.listen(3000, () => console.log('server has started!'));
