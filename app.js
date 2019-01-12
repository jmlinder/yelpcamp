const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const campgrounds = [
	{
		name: 'Salmon Creek',
		image:
			'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Galt Gulch',
		image:
			'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Granite Hill',
		image:
			'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Slate Valley',
		image:
			'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Wolf Pass',
		image:
			'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Mountain Goat Ridge',
		image:
			'https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Razorfin Lodge',
		image:
			'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=croph=300&w=500&q=80'
	},
	{
		name: 'Helvetica Park',
		image:
			'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Zaptail Range',
		image:
			'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Dodge Creek',
		image:
			'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Eagles Pass',
		image:
			'https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80'
	},
	{
		name: 'Cyclops Nest',
		image:
			'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80'
	}
];
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('landing'));

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
	const name = req.body.name;
	const image = req.body.image;
	const newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => res.render('new'));

app.listen(3000, () => console.log('server has started!'));
