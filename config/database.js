const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
mongoose.set('runValidators', true);

// note:  .then .catch instead of try catch for now.
const connectMongooseToMongoDB = async () => {
  await mongoose.connect(uri)
    .then(() => console.log('Successfully connected to MongoDB! ', mongoose.connection.name))
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1); // to shut down server
    });
}

module.exports = connectMongooseToMongoDB;