const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'A username is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: true,
            validate: {
                validator: function (valid) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(valid);
                },
                message: validProps => `${validProps.value} please try again, this is not a valid email address!`
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Create a virtual property 'friendCount' that retrieves the length of the user's 'friends' array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
