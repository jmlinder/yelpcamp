const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: "Clouds Rest",
    image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80",
    description: "If we're going to have animals around we all have to be concerned about them and take care of them. Remember how free clouds are. They just lay around in the sky all day long. This is unplanned it really just happens. Just let go - and fall like a little waterfall.",
  },
  {
    name: 'Salmon Creek',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "You can create beautiful things - but you have to see them in your mind first. This is a happy place, little squirrels live here and play. Just let your mind wander and enjoy. This should make you happy. Put light against light - you have nothing. Put dark against dark - you have nothing. It's the contrast of light and dark that each give the other one meaning. Everybody's different. Trees are different. Let them all be individuals.",
  },
  {
    name: 'Slate Valley',
    image: 'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "Maybe there's a happy little Evergreen that lives here. And I know you're saying, 'Oh Bob, you've done it this time.' And you may be right. Imagination is the key to painting. You don't have to spend all your time thinking about what you're doing, you just let it happen.",
  },
  {
    name: 'Wolf Pass',
    image: 'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "In your world you can create anything you desire. You have to make these big decisions. We touch the canvas, the canvas takes what it wants. Just let this happen. We just let this flow right out of our minds. I'm going to mix up a little color. We’ll use Van Dyke Brown, Permanent Red, and a little bit of Prussian Blue. You're meant to have fun in life.",
  },
  {
    name: 'Mountain Goat Ridge',
    image: 'https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "So often we avoid running water, and running water is a lot of fun. That's a son of a gun of a cloud. A fan brush is a fantastic piece of equipment. Use it. Make friends with it. Be brave. Think about a cloud. Just float around and be there.",
  },
  {
    name: 'Razorfin Lodge',
    image: 'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=croph=300&w=500&q=80',
    description: "Put light against light - you have nothing. Put dark against dark - you have nothing. It's the contrast of light and dark that each give the other one meaning. If you've been in Alaska less than a year you're a Cheechako. Very easy to work these to death. Let's make a happy little mountain now.",
  },
  {
    name: 'Helvetica Park',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "Let's just drop a little Evergreen right here. You're the greatest thing that has ever been or ever will be. You're special. You're so very special. A happy cloud. It's almost like something out of a fairytale book. That is when you can experience true joy, when you have no fear. Everything's not great in life, but we can still find beauty in it.",
  },
  {
    name: 'Zaptail Range',
    image: 'https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "Even the worst thing we can do here is good. You don't have to be crazy to do this but it does help. Just go out and talk to a tree. Make friends with it. Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned. There he comes.",
  },
  {
    name: 'Dodge Creek',
    image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80',
    description: "Mountains are so simple, they're hard. This is truly an almighty mountain. When things happen - enjoy them. They're little gifts. You can bend rivers. But when I get home, the only thing I have power over is the garbage.",
  },
  {
    name: 'Eagles Pass',
    image: 'https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&auto=format&fit=crop&h=300&w=500&q=80',
    description: "This is a fantastic little painting. You don't have to spend all your time thinking about what you're doing, you just let it happen. So often we avoid running water, and running water is a lot of fun. You can't have light without dark. You can't know happiness unless you've known sorrow. Only eight colors that you need. Just go back and put one little more happy tree in there.",
  },
  {
    name: 'Cyclops Nest',
    image: 'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=300&w=500&q=80',
    description: "I started painting as a hobby when I was little. I didn't know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Even trees need a friend. We all need friends. Learn when to stop. We have no limits to our world. We're only limited by our imagination.",
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