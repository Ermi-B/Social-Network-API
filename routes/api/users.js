const express = require("express");
const router = express.Router();

const User = require('../../models/Users');

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// GET one user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

// POST - Create a new user
router.post("/", async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// PUT - Update one user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated user data
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

// DELETE - Delete one user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// //api/users/:userId/friends/:friendId
// POST - Add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Find the user and friend documents
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    // Check if both user and friend exist
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or Friend not found' });
    }

    // Check if the friend is already in the user's friend list
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend already in the user' });
    }

    // Add the friend to the user's friend list
    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: 'Friend added successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err.message });
  }
});

// DELETE - Remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Find the user document
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the friend is in the user's friend list
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend not found in the user\'s friend list' });
    }

    // Remove the friend from the user's friend list
    user.friends.pull(friendId);
    await user.save();

    res.status(200).json({ message: 'Friend removed successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err.message });
  }
});

module.exports = router;


module.exports = router;
