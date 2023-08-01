const mongoose = require('mongoose');
const User = require('../models/user');
const Thought = require('../models/thought');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define seed data
const users = [
  {
    username: 'johnsmith',
    email: 'johnsmith@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: "janedoe",
    email: "janedoe@example.com",
    thoughts: [],
    friends: []
  },
  {
    username: "mikejohnson",
    email: "mikejohnson@example.com",
    thoughts: [],
    friends: []
  }
];

const thoughts = [
  {
    thoughtText: 'Just had a great workout!',
    username: 'johnsmith',
    reactions: 
    [
      {
        reactionBody: 'This is a reaction!',
        username: 'janedoe',
      },
      {
        reactionBody: 'Glad to hear that!',
        username: 'mikejohnson',
      },
    ]
  },
  {
    thoughtText: "Excited for the weekend!",
    username: "janedoe",
    reactions: 
    [
      {
        reactionBody: 'Me too!',
        username: 'johnsmith',
      },
    ]
  },
  {
    thoughtText: "Enjoying a beautiful day at the beach.",
    username: "mikejohnson",
    reactions: 
    [
      {
        reactionBody: 'Sounds wonderful!',
        username: 'janedoe',
      },
    ]
  }
];

const seedData = async () => {
  try {
    await User.deleteMany();
    await Thought.deleteMany(); 
    const createdUsers = await User.create(users);
    const createdThoughts = await Thought.create(thoughts);

    console.log('Seed data inserted successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();