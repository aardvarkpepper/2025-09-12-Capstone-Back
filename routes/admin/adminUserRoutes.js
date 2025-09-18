const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
// const passport = require('passport');
// const authController = require('../../controllers/authController');
// const verifyAuthentication = require('../../middleware/authMiddleware');
// const adminOnly = require('../../middleware/adminMiddleware');
//router.use(authenticationMiddleware); runs for all defined in this spot . . . all the following routes will use it.

/**
 * api/users
 */
// router.post('/', userController.createUser);
// router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
// router.post('/', userController.registerUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// router.get('/', userController.getAllUsers);


// router.get('/', verifyAuthentication, authController.getUser);
// router.get('/admin', verifyAuthentication, adminOnly, authController.getUser);
// router.post('/register', authController.registerUser);
// router.post('/login', authController.loginUser);

// router.get(
//   '/profile', 
//   passport.authenticate('jwt', { session: false }),
//   authController.getUser
// );

//////////////////
// GitHub OAuth //
//////////////////
// router.get('/github', passport.authenticate('github'));

// router.get(
//   '/github/callback', 
//   passport.authenticate('github'),
//   (req, res) => {
//     // This function only runs if authentication succeeded
//     // req.user is now populated by Passport with user data
//     res.redirect('/api/auth/welcome');
//   }
// );

// router.get('/welcome', (req, res) => {
//   if (!req.user) return res.status(401).json({ error: 'You must be logged in to see this.' });
//   res.send(`Welcome ${req.user.username}!!!`);
// });




/**
 * //=====
// userRoutes.js

const router = require('express').Router();
const User = require('../../models/User');
const { signToken } = require('../../utils/auth');
 
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
    //if user already exists, 400 error
  } catch (err) {
    res.status(400).json(err); // actually would be 500
  }
});
 
// POST /api/users/login - Authenticate a user and return a token
router.post('/login', async (req, res) => {

  //console.log('Attempting login with email', req.body.email);
  // console.log('User', User, 'Properties of undefined reading findOne');
  const user = await User.findOne({ "email": req.body.email });
 
  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }
 
  const correctPw = await user.isCorrectPassword(req.body.password);
 
  if (!correctPw) {
    return res.status(400).json({ message: 'Wrong password!' });
  }
 
  const token = signToken(user);
  res.json({ token, user });
});
 

 */

module.exports = router;