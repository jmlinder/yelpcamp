const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat-app', { useNewUrlParser: true });

const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// mongoose model renders a collection of Cats (param1) using a schema (param2)
const Cat = mongoose.model('Cat', catSchema);

// const george = new Cat({
// 	name: 'Purty Lee',
// 	age: 13,
// 	temperament: 'territorial'
// });

// george.save((err, cat) => {
// 	if (err) {
// 		console.log('Something went wrong!');
// 	} else {
// 		console.log('Cat saved to the database!');
// 		console.log(cat);
// 	}
// });

Cat.create(
	{
		name: 'Milton',
		age: 11,
		temperament: 'nice'
	},
	(err, cat) => {
		if (err) {
			console.log(err);
		} else {
			console.log(cat);
		}
	}
);

Cat.find({}, (err, cats) => {
	if (err) {
		console.log('An error occurred.');
	} else {
		console.log("HERE'S ALL THE CATS!😻");
		console.log(cats);
	}
});
