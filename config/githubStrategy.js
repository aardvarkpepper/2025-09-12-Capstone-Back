/**
 * Implement OAuth Routes: Add the GitHub OAuth routes from Lesson 4 to your user routes file.
GET /api/users/auth/github: This route will kick off the OAuth flow by redirecting the user to GitHub.
GET /api/users/auth/github/callback: This is your callback URL. It should use passport.authenticate, and upon successful authentication, it should sign a JWT for the user and return it to the client (e.g., via a redirect with a query parameter).

This takes the place of 'passport.js.'
 */

const User = require('../models/User');
const { Strategy: GitHubStrategy } = require('passport-github2');
const passport = require('passport');

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL, // e.g., 'http://localhost:3001/api/users/auth/github/callback'
  scope: ['user:email'] //?
};

passport.use(new GitHubStrategy(options,
  // This is the "verify" callback
  // The "profile" object contains the user's GitHub information
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        await User.create({
          githubId: profile.id,
          username: profile.username,
          email: profile.emails[0].value, // as Github may store multiple emails but for this SBA we only use one
          password: profile.username + profile.email + profile.id // ?
        });
        user = await User.findOne({ githubId: profile.id }).select('-password -role -githubId'); // An additional database operation, but this serves to confirm the data has actually been created and stored.
      }

      return done(null, user); // https://www.passportjs.org/packages/passport-jwt/ 'new JwtStrategy(options, verify) ... verify is a function with the parameters verify(jwt_payload, done)'. done is a passport error first callback accepting arguments done(error, user, info)
      // however, this is 'GitHubStrategy.  At any rate, probably 'done' is similarly structured, and Lesson 4 material returns done(err) as a matter of course.  Note 'null, user' means no error and user; 'error, false' means error present and user falsy.
    } catch (error) {
      return done(error, false);
    }
  } // async (accessToken...)
)); // closes new GitHubStrategy( (inside), passport.use( (outside)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
});

/**
 * lesson 4 uses truthy/falsy to accomplish the same end.
 * passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
 */