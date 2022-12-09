const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
    {
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280, 
        unique: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
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
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('user', userSchema)

module.exports = User;