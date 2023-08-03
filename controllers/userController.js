const { User, Thought } = require('../models');

const userController = {

  getAllUsers(req, res) {
    User.find()
      .populate('thoughts')
      .populate('friends')
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  getUserById(req, res) {
    User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json({ message: 'User created successfully', user });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    },

  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    },

  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return User.updateMany(
          { _id: { $in: user.friends } },
          { $pull: { friends: user._id } }
        );
      })
      .then(() => {
        return Thought.deleteMany({ username: req.params.username });
      })
      .then(() => {
        res.json({ message: 'User deleted successfully' });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    },

  addFriend(req, res) {
    const { userId, friendId } = req.params;

    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId }, $inc: { friendCount: 1 } },
      { new: true }
    )
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Friend added successfully', user });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },


  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Friend removed successfully', user });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};

module.exports = userController;