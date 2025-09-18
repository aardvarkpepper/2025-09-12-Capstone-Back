const Ool = require('../models/Ool');
require('dotenv').config();

/**
 * router.get('/', oolController.getAllOols);
 router.post('/', oolController.createOol);
 router.put('/:id', oolController.updateOol);
 router.delete('/:id', oolController.deleteOol);
 */

// note:  Re-examine logic.
/** 
 * const oolSchema = new Schema({
  commonName: {
    type: Object,
    of: String
  },
  description: {
    type: Object,
    of: String
  },
  ool: {
    type: String,
    required: [true, 'Please enter an Order Of Loss'], // note validation should occur locally and server side.  Implement with 'ruleset'.  
  }
});
*/

const createOol = async (req, res) => {
  Ool.create(req.body)
    .then(createdOol => {
      console.log('Ool created successfully:', createdOol);
      res.status(201).json({ message: 'Ool created', ool: createdOol });
    })
    .catch(err => {
      console.error('Error creating ool:', err);
      res.status(400).json({ message: `Unspecified error when creating ool.  ${err}` });
    })
};

const createOolRestrict = async (req, res) => {
  console.log('createOOLRestrict', req.body);
  Ool.create({
    commonName: {en: req.body.ool},
    description: {en: req.body.ool},
    ool: req.body.ool
  })
    .then(createdOol => {
      console.log('Ool created successfully:', createdOol);
      res.status(201).json({ message: 'Ool created', ool: createdOol });
    })
    .catch(err => {
      console.error('Error creating ool:', err);
      res.status(400).json({ message: `Unspecified error when creating ool.  ${err}` });
    })
};

// const oolSchema = new Schema({
//   commonName: {
//     type: Object,
//     of: String
//   },
//   description: {
//     type: Object,
//     of: String
//   },
//   ool: {
//     type: String,
//     required: [true, 'Please enter an Order Of Loss'], // note validation should occur locally and server side.  Implement with 'ruleset'.  
//   }
// });

const getAllOols = async (req, res) => {
    Ool.find()
    .then(allOols => {
      console.log('All ools in collection:', allOols); // array or null (?)
      res.status(200).json({ message: 'All ools', ools: allOols });
    })
    .catch(err => {
      console.error('Error retrieving all ools:', err);
      res.status(500).json({ message: 'Unspecified error when retrieving all ools.' });
    })
}; // getAllOols

// remember, data is stored as an objectId not a string, eh?  But req.user is also an objectId
const getAllOolsByUserId = async (req, res) => {
    Ool.find({user: req.user._id})
    .then(allOols => {
      console.log('All ools in collection:', allOols); // array or null (?)
      res.status(200).json({ message: 'All ools', ools: allOols });
    })
    .catch(err => {
      console.error('Error retrieving all ools:', err);
      res.status(500).json({ message: 'Unspecified error when retrieving all ools.' });
    })
}; // getAllOols

const updateOol = async (req, res) => {
  const oolId = req.params.id;
  const options = { new: true };
  Ool.findByIdAndUpdate(oolId, req.body, options)
    .then(updatedOol => {
      console.log('Ool updated:', updatedOol); // always an array, I assume.  Could be null, I assume.
      res.status(200).json({ message: `Updated ool`, ool: updatedOol });
    })
    .catch(err => {
      console.error('Error updating ool:', err);
      res.status(404).json({ message: `Unspecified error when updating ool with ID ${oolId}` });
    })
};

const deleteOol = async (req, res) => {
  const oolId = req.params.id;
  Ool.findByIdAndDelete(oolId)
    .then(deletedOol => { // if the ool is not found, we get a null return.
      if (deletedOol) {
        console.log('Successfully deleted ool:', deletedOol);
        res.status(200).json({ message: `Successfully deleted ool:`, ool: deletedOol });
      } else {
        console.log('Could not find ool to delete.')
        res.status(404).json({ message: `Ool with ${oolId} could not be found to be deleted.` });
      }
    })
    .catch(err => {
      console.error('Error deleting ool:', err);
      res.status(500).json({ message: `Unspecified error when deleting ool with ID ${oolId}` });
    })
}; // deleteOol

module.exports = {
  createOol,
  createOolRestrict,
  getAllOols,
  getAllOolsByUserId,
  updateOol,
  deleteOol,
};

/**
 * async function getOol(req, res) {
  try {
    if (!req.ool) return res.status(401).json({ error: 'You must be logged in to see this.' });
    const foundOol = await Ool.findById(req.ool._id).select('-password -role');
    res.status(200).json(foundOol);
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function registerOol(req, res) {
  try {
    const foundOol = await Ool.findOne({ email: req.body.email });
    if (foundOol !== null) return res.status(400).json({ error: 'This ool already exists.' });

    const createdOol = await Ool.create(req.body);

    const jwtSecretKey = process.env.JWT_SECRET;
    const payload = { 
      _id: createdOol._id,
      role: createdOol.role
    };

    jwt.sign(
      { data: payload },
      jwtSecretKey,
      { expiresIn: '1h' },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ success: 'Ool created successfully.', token });
      }
    );
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function loginOol(req, res) {
  try {
    const foundOol = await Ool.findOne({ email: req.body.email });
    if (!foundOol) return res.status(400).json({ error: 'Incorrect email or password.' });

    const isPasswordCorrect = await foundOol.checkPassword(req.body.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect email or password.' });

    const jwtSecretKey = process.env.JWT_SECRET;
    const payload = { 
      _id: foundOol._id,
      role: foundOol.role
    };

    jwt.sign(
      { data: payload },
      jwtSecretKey,
      { expiresIn: '1h' },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ success: 'Ool logged in successfully.', token });
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

// async function registerOol(req, res) {
//   try {
//     const foundOol = await Ool.findOne({ email: req.body.email });
//     if (foundOol !== null) return res.status(400).json({ error: 'This ool already exists.' });
//     const createdOol = await Ool.create(req.body);
//     res.status(201).json({ success: 'Ool created successfully', ool: createdOol });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// }

// async function loginOol(req, res) {
//   try {
//     const ool = await Ool.findOne({ email: req.body.email });
//     if (!ool) return res.status(400).json({ error: 'Incorrect email or password.' });

//     const isPasswordCorrect = await ool.checkPassword(req.body.password);
//     if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect email or password.' });

//     res.status(200).json({ success: 'Ool logged in successfully.', ool });
//   } catch(error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// }

module.exports = {
  getOol,
  registerOol,
  loginOol
};
 */




/**
 * BELOW are orig route/controllers.
 */

// router.get('/', async (req, res) => {
//   try {
//     if (!req.user._id) {
//       throw new Error("No user._id detected.  The user may not be logged in.")
//     }
//     const ools = await Ool.find({ user: req.user._id });
//     res.json(ools);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     if (!req.user._id) {
//       throw new Error("No user._id detected.  The user may not be logged in.")
//     }
//     const ool = await Ool.findOne({ _id: req.params.id }); // why didn't I use findById?  Practice, why not.
//     // could just pop another field in the findOne argument, but eh.
//     if (!ool) {
//       return res.status(404).json({ message: 'No ool found with this id!' });
//     }
//     if (ool.user !== req.user._id) {
//       return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to view this ool.' });
//     }
//     res.status(201).json(ool);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// /**
//  * Modify the “Create Ool” Route: In your ools route file (routes/api/ools.js), find the POST / route. When a new ool is created, you must associate it with the currently logged-in user. The authenticated user’s data should be available on req.user from the authentication middleware. Save the user’s _id to the new ool’s user field.
//  */

// // POST /api/ools - Create a new ool
// router.post('/', async (req, res) => {
//   try {
//     if (!req.user._id) {
//       throw new Error("No user._id detected.  The user may not be logged in.")
//     }
//     const ool = await Ool.create({
//       ...req.body,
//       user: req.user._id,
//       // The user ID needs to be added here - done.
//     });
//     res.status(201).json(ool);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // PUT /api/ools/:id - Update a ool
// router.put('/:id', async (req, res) => {
//   try {
//     if (!req.user._id) {
//       throw new Error("No user._id detected.  The user may not be logged in.")
//     }
//     // This needs an authorization check
//     const ool = await Ool.findById(req.params.id);
//     // console.log('Put: ool found: ool.user:', ool.user);
//     if (!ool) {
//       return res.status(404).json({ message: 'No ool found with this id!' });
//     }
//     if (String(ool.user) !== req.user._id) {
//       console.log('put', String(ool.user), req.user._id, String(ool.user) === req.user._id);
//       return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to alter this ool.' });
//     }
//     const updatedOol = await Ool.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedOol);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE /api/ools/:id - Delete a ool
// router.delete('/:id', async (req, res) => {
//   try {
//     if (!req.user._id) {
//       throw new Error("No user._id detected.  The user may not be logged in.")
//     }
//     // This needs an authorization check
//     const ool = await Ool.findById(req.params.id);
//     if (!ool) {
//       return res.status(404).json({ message: 'No ool found with this id!' });
//     }
//     if (String(ool.user) !== req.user._id) {
//       return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to delete this ool.' });
//     }
//     const deletedOol = await Ool.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Ool deleted!', ool: deletedOol });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;