const express = require('express');
const router = express.Router();

const User = require('../../models/Users');
const Thought = require('../../models/Thoughts');

// GET - Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching thoughts', error: err.message });
  }
});

// GET - Get a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching thought', error: err.message });
  }
});

// POST - Create a new thought
router.post('/', async (req, res) => {
  const { thoughtText, username } = req.body;
  try {
    // Create a new thought using the Thought model
    const newThought = await Thought.create({ thoughtText, username });

    // Add the created thought's _id to the associated user's thoughts array field
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: newThought._id } },
      { new: true } // Return the updated user data
    );

    res.status(201).json({ message: 'Thought created successfully', thought: newThought, user });
  } catch (err) {
    res.status(500).json({ message: 'Error creating thought', error: err.message });
  }
});
// PUT - Update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
    try {
      const { thoughtText } = req.body;
      const { thoughtId } = req.params;
  
      // Find the thought document by its _id
      const thought = await Thought.findById(thoughtId);
  
      // Check if the thought exists
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Update the thought's thoughtText
      thought.thoughtText = thoughtText;
      await thought.save();
  
      res.status(200).json({ message: 'Thought updated successfully', thought });
    } catch (err) {
      res.status(500).json({ message: 'Error updating thought', error: err.message });
    }
  });
  
  // DELETE - Remove a thought by its _id
  router.delete('/:thoughtId', async (req, res) => {
    try {
      const { thoughtId } = req.params;
  
      // Find the thought document by its _id
      const thought = await Thought.findById(thoughtId);
  
      // Check if the thought exists
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Remove the thought from the database
      await thought.deleteOne();
  
      // Remove the thought's _id from the associated user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thoughtId } },
        { new: true } // Return the updated user data
      );
  
      res.status(200).json({ message: 'Thought deleted successfully', thought, user });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting thought', error: err.message });
    }
  });
  

module.exports = router;
