const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: "Clouds Rest",
    image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80",
    description: "stuff and things",
  },
  {
    name: 'Salmon Creek',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Slate Valley',
    image: 'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Wolf Pass',
    image: 'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Mountain Goat Ridge',
    image: 'https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Razorfin Lodge',
    image: 'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=croph=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Helvetica Park',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Zaptail Range',
    image: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Dodge Creek',
    image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Eagles Pass',
    image: 'https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  },
  {
    name: 'Cyclops Nest',
    image: 'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "stuff and things",
  }
];

function seedDB() {
  // Remove campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('campground removed');
    // Create campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err)
        } else {
          console.log('added a campground!');
          //Create a comment
          Comment.create(
            {
              text: 'This place is great, but I wish it had internet',
              author: 'Homer',
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created new comment!');
              }
            });
        }
      });
    });
  });
}
module.exports = seedDB;