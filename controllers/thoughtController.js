const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => {
            res.json(thoughts)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById(req, res) {
        Thought.findById(req.params.id)
        .then((thought) => {
            if(!thought) {
                return res.status(404).json({message: 'Thought not found' });
            }
            res.json(thought);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id }},
                { new: true }
            );
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'Thought created successfully', user });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((thought) => {
            if(!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Thought updated successfully', thought });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.id)
        .then((thought) => {
            if(!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            return User.findByIdAndUpdate(
                thought.userId,
                { $pull: { thoughts: thought._id }},
                { new: true }
            );
        })
        .then((user) => {
            if(!user) {
                return res.status(404).json({ message: ' User not found' });
            }
            res.json({ message: 'Thought deleted successfully', user });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.id,
            { $push: { reactions: req.body }},
            {new: true }
        )
        .then((thought) => {
            if(!user) {
                return res.status(404).json({ message: ' Thought not found' });
            }
            res.json({ message: 'Reaction added successfully', thought });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.id,
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true }
        )
        .then((thought) => {
            if(!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Reaction deleted successfully', thought });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
};

module.exports = thoughtController;