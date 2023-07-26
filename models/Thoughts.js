const mongoose = require('mongoose');
const reactionSchema = require('./ReactionSchema'); // Assuming the reaction schema is defined in a separate file

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toISOString(), // Format the timestamp on query
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Using the reactionSchema as a subdocument
});

// Virtual to retrieve the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
