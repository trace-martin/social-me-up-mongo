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
    username: 'DarthSidious',
    email: 'darthsidious@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'darthVader',
    email: 'darthvader@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'Darth-Maul',
    email: 'darthmaul@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'countdOOku',
    email: 'countdooku@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'darthrevan',
    email: 'darthrevan@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'AsajjV',
    email: 'asajjventress@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'kyloren',
    email: 'kyloren@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'snoke',
    email: 'snoke@sith.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'darthbane',
    email: 'darthbane@sith.com',
    thoughts: [],
    friends: []
  }
];

const thoughts = [
  {
    thoughtText: 'The dark side is strong!',
    username: 'DarthSidious',
    reactions: [
      {
        reactionBody: 'Indeed it is!',
        username: 'darthVader',
      },
      {
        reactionBody: 'The power of the Sith!',
        username: 'Darth-Maul',
      },
    ]
  },
  {
    thoughtText: 'The Jedi must be destroyed!',
    username: 'darthVader',
    reactions: [
      {
        reactionBody: 'The Sith will prevail!',
        username: 'DarthSidious',
      },
    ]
  },
  {
    thoughtText: 'My double-bladed lightsaber is unmatched!',
    username: 'Darth-Maul',
    reactions: [
      {
        reactionBody: 'A formidable weapon!',
        username: 'DarthVader',
      },
    ]
  },
  {
    thoughtText: 'My double-bladed lightsaber is unmatched!',
    username: 'Darth-Maul',
    reactions: [
      {
        reactionBody: 'A formidable weapon!',
        username: 'DarthVader',
      },
    ]
  },
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