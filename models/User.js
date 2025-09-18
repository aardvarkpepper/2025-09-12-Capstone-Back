const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * USER is an object with id number, username, email, password, isVerified (email verified), accessToken, avatar, blurb, rank, location, theme, language, notificationSettings.  Remember that 'accessToken' should be stored in localStorage;
 */

/**
 * Note "findAndReplace and other replace functions remove time created and last modified, replacing with current time.  Therefore, avoid replace."
 * 
 * Timestamps applies to the entire document, not individual fields.  Apply using userSchema.pre (as other middleware) if applying to individual fields.
 */

// new Schema, if deconstructed.  As it is not, mongoose.Schema.
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username.'],
    unique: [true, 'This username has already been taken.'],
    trim: true,
  },
  email: { // the user may have one of password or githubId, or both.  email links the two, though username is also unique - so ordered by instructions in SBA (skills based assessment).
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, 'This email already exists.'],
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 5,
  },
  role: {
    type: String,
    enum: ['user', 'sub', 'admin'],
    default: 'user'
  },
  // githubId: {
  //   type: String,
  //   unique: true,
  //   minlength: 1, // presumably github requires at least one character
  // },
  //   role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // githubId: { type: String, unique: true }
});

// hash user password
// may pop this function somewhere else then import it?  What's standard practice?
userSchema.pre('save', async function (next) { // anonymous function not used as 'this' required.
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) { // not anon function, as using this.  Here, this will reference user document, but not if anon.
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;