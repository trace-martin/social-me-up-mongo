const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Define routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/thought', require('./routes/thoughtRoutes'));

mongoose.set('debug', true);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});