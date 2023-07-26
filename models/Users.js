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
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;