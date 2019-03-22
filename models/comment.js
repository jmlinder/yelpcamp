const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: String,
<<<<<<< HEAD
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

=======
  author: String
});
>>>>>>> 85d2ff8b34f3d42a0e283a9739c92a3faa942019
module.exports = mongoose.model('Comment', commentSchema);