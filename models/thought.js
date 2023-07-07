const { Schema, mongoose } = require('mongoose');
// const date = require('moment');

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: () => dateFormat()
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: () => dateFormat()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    { 
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema)

module.exports = Thought;