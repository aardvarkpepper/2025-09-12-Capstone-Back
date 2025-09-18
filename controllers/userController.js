const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// note:  Re-examine logic.

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  let isThereAnotherUserWithSameEmail;
  try {
    isThereAnotherUserWithSameEmail = await User.findOne({ email: email });
  } catch (error) {
    return res.json({ error: `An unspecified error has occured:  ${error}` });
  }
  if (isThereAnotherUserWithSameEmail) {
    return res.status(400).json({ error: `400 Bad Request:  Another user with email ${email} already exists.` });
  }
  // if we get this far then isThereAnotherUserWithSameEmail returned null (presumably, may have to deconstruct), and no errors.  So we can just go ahead and create a new user.  Note User.js contains middleware that encrypts the password.
  // could pop this in a try/catch but . . . eh.  It's self-contained.
  User.create(req.body)
    .then(createdUser => {
      console.log('User created successfully:', createdUser);
      // Note 1: going to use .find https://ps-lms.vercel.app/curriculum/se/319/lesson-5 ; just exclude the data.  Besides I need the password anyways if user is actually created.
      // Note 2: Excluding password of course; what's the point of encrypting it then sending it back on an unsecured connection?  Consistent with lesson.
      res.status(201).json({ message: `User created`, user: { username, email, role } });
    })
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(400).json({ message: `Unspecified error when creating user.  ${err}` });
    })
} // registerUser

const login = async (req, res) => {
  let isThereAUserWithThisEmail;
  const { email, password } = req.body;
  try {
    isThereAUserWithThisEmail = await User.findOne({ email: email }); // null if none, right?
  } catch (error) {
    res.json({ error: `An unspecified error has occured`, error: error });
    return;
  }
  if (!isThereAUserWithThisEmail) {
    res.status(400).json({ message: `No user with this email exists.  Noted that vague error messages may be desired by some for security.` });
    return;
  }

  //So there IS a user with this email if we've gotten this far, now we just want to check password.
  // .isCorrectPassword is defined on the User schema.
  const correctPw = await isThereAUserWithThisEmail.isCorrectPassword(password);

  if (!correctPw) {
    res.status(400).json({ message: "Incorrect password.  Noted vague error messages may be desirable for security purposes" });
    return;
  }

  // else {
  //   console.log('Proceeding to JWT generation.');
  //   //res.status(200).json({message: 'Activity complete'}); // commnent this out later.
  //   // no return as not halting process.
  // }

  // JWT below
  const secret = process.env.JWT_SECRET;
  const expiration = '1h';

  // Payload doesn't really need all this as username and email are unique - or is it better to have more info to make decrypt attacks harder?
  const payload = {
    _id: isThereAUserWithThisEmail._id,
    username: isThereAUserWithThisEmail.username,
    email: isThereAUserWithThisEmail.email,
    role: isThereAUserWithThisEmail.role
  }

  const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });

  return res.json({ token, user: { username: isThereAUserWithThisEmail.username, email: isThereAUserWithThisEmail.email, role: isThereAUserWithThisEmail.role } });
} // login

// const createUser = async (req, res) => {
//   User.create(req.body)
//     .then(createdUser => {
//       console.log('User created successfully:', createdUser);
//       res.status(201).json({ message: 'User created', user: createdUser });
//     })
//     .catch(err => {
//       console.error('Error creating user:', err);
//       res.status(400).json({ message: `Unspecified error when creating user.  ${err}` });
//     })
// };

const getAllUsers = async (req, res) => {
    User.find()
    .then(allUsers => {
      console.log('All users in collection:', allUsers); // array or null (?)
      res.status(200).json({ message: 'All users', users: allUsers });
    })
    .catch(err => {
      console.error('Error retrieving all users:', err);
      res.status(500).json({ message: 'Unspecified error when retrieving all users.' });
    })
  // const category = req.query.category;
  // const minPrice = req.query.minPrice;
  // const maxPrice = req.query.maxPrice;
  // const sortBy = req.query.sortBy ? req.query.sortBy.split("_")[0] : null;
  // const sortAscOrDesc = req.query.sortBy ? (req.query.sortBy.split("_")[1] === "desc" ? -1 : 1) : null;
  // // any nonsense will result in ascending order.  Could also just use 'asc' or 'desc' as those are accepted raw, but eh.
  // // Remember, the query parameters are 'limit' and 'page', not pageIn or limitIn.
  // const pageIn = req.query.page ? Math.round(Number(req.query.page)) : 0;
  // const limitIn = req.query.limit ? Math.round(Number(req.query.limit)) : 0;
  // const page = pageIn ? pageIn : 1;
  // const limit = limitIn ? limitIn : 10;

  // const customFilter = () => {
  //   const returnObject = {};
  //   const priceFilterObject = {};
  //   if (category) {
  //     returnObject.category = category;
  //     nullReturn = false;
  //   };
  //   if (minPrice || maxPrice) {
  //     returnObject.price = priceFilterObject;
  //   }
  //   if (minPrice) {
  //     priceFilterObject.$gte = minPrice;
  //   }
  //   if (maxPrice) {
  //     priceFilterObject.$lte = maxPrice;
  //   }
  //   return returnObject; // If none of the 'if' are true, then returns {} which is 'all' fields.
  // };

  // User.find(customFilter())
  //   .sort(sortBy ? { [sortBy]: sortAscOrDesc } : {})
  //   .skip((page - 1) * limit)
  //   .limit(limit)
  //   .then(allUsers => {
  //     console.log('All users in collection:', allUsers); // array or null (?)
  //     res.status(200).json({ message: 'All users', users: allUsers });
  //   })
  //   .catch(err => {
  //     console.error('Error retrieving all users:', err);
  //     res.status(500).json({ message: 'Unspecified error when retrieving all users.' });
  //   })
}; // getAllUsers

// const getUser = async (req, res) => {
//   const userId = req.params.id;
//   // presumably we have to ID to work with because front end input is working off a list that includes IDs.  It is presumed the user is not directly manipulating the database.
//   User.findById(userId)
//     .then(user => {
//       console.log('Found user:', user); // array or null (?)
//       res.status(200).json({ message: `Found user`, user: user });
//     })
//     .catch(err => {
//       console.error('Error retrieving user:', err);
//       res.status(404).json({ message: `Unspecified error when retrieving user with ID ${userId}` });
//     })
// };

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const options = { new: true };
  User.findByIdAndUpdate(userId, req.body, options)
    .then(updatedUser => {
      console.log('User updated:', updatedUser); // always an array, I assume.  Could be null, I assume.
      res.status(200).json({ message: `Updated user`, user: updatedUser });
    })
    .catch(err => {
      console.error('Error updating user:', err);
      res.status(404).json({ message: `Unspecified error when updating user with ID ${userId}` });
    })
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(deletedUser => { // if the user is not found, we get a null return.
      if (deletedUser) {
        console.log('Successfully deleted user:', deletedUser);
        res.status(200).json({ message: `Successfully deleted user:`, user: deletedUser });
      } else {
        console.log('Could not find user to delete.')
        res.status(404).json({ message: `User with ${userId} could not be found to be deleted.` });
      }
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: `Unspecified error when deleting user with ID ${userId}` });
    })
}; // deleteUser

module.exports = {
  // createUser,
  getAllUsers,
  // getUser,
  updateUser,
  deleteUser,
  registerUser,
  login
};
/**
 * async function getUser(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'You must be logged in to see this.' });
    const foundUser = await User.findById(req.user._id).select('-password -role');
    res.status(200).json(foundUser);
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function registerUser(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser !== null) return res.status(400).json({ error: 'This user already exists.' });

    const createdUser = await User.create(req.body);

    const jwtSecretKey = process.env.JWT_SECRET;
    const payload = { 
      _id: createdUser._id,
      role: createdUser.role
    };

    jwt.sign(
      { data: payload },
      jwtSecretKey,
      { expiresIn: '1h' },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ success: 'User created successfully.', token });
      }
    );
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(400).json({ error: 'Incorrect email or password.' });

    const isPasswordCorrect = await foundUser.checkPassword(req.body.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect email or password.' });

    const jwtSecretKey = process.env.JWT_SECRET;
    const payload = { 
      _id: foundUser._id,
      role: foundUser.role
    };

    jwt.sign(
      { data: payload },
      jwtSecretKey,
      { expiresIn: '1h' },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ success: 'User logged in successfully.', token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

//////////////
// LESSON 1 //
//////////////

// async function registerUser(req, res) {
//   try {
//     const foundUser = await User.findOne({ email: req.body.email });
//     if (foundUser !== null) return res.status(400).json({ error: 'This user already exists.' });
//     const createdUser = await User.create(req.body);
//     res.status(201).json({ success: 'User created successfully', user: createdUser });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// }

// async function loginUser(req, res) {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(400).json({ error: 'Incorrect email or password.' });

//     const isPasswordCorrect = await user.checkPassword(req.body.password);
//     if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect email or password.' });

//     res.status(200).json({ success: 'User logged in successfully.', user });
//   } catch(error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// }

module.exports = {
  getUser,
  registerUser,
  loginUser
};
 */