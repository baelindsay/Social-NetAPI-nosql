const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            return res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then(async (thought) =>
            !thought
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: "no thought found with this Id" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },


    addReaction(req, res) {
        console.log("You are adding a reaction");
        console.log(req.body);
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: "No thought found with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !this.getSingleThought
            ? res.status(404).json({ message: "No thought found with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};
