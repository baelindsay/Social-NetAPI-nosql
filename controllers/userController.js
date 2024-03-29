const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
            const userObj = {
            users,
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
                });
    },
    // create new student
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // delete user
        deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
            !user
            ? res.status(404).json({ message: 'No such user exists' })
            : res.json({ message: 'User successfully deleted' })
        )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
    },
}