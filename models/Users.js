const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/, // Use regex pattern for email validation
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  });

  // Virtual to retrieve the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
  // Pre-remove hook to remove associated thoughts when a user is deleted
userSchema.pre('remove', async function (next) {
  try {
    // Access the Thought model since 'this' refers to the user document being removed
    const Thought = mongoose.model('Thought');

    // Find all thoughts associated with the user and remove them
    await Thought.deleteMany({ username: this.username });

    next();
  } catch (err) {
    next(err);
  }
});
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;