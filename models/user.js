const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
    {
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
            trim: true, 
            // use regex formula for email
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                "Please provide a valid email address.",
            ]
        },
        thoughts: [
            { 
                type: String, 
                ref: 'thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);


userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('user', userSchema)

module.exports = User;