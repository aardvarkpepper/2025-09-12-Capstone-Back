const UserLink = require('../models/UserLink');

/** 
const userLinkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    //https://mongoosejs.com/docs/schematypes.html#objectids
    // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
    ref: 'User',
    required: true,
  },
  userLink: {
    type: Schema.Types.ObjectId,
    //https://mongoosejs.com/docs/schematypes.html#objectids
    // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
    ref: 'UserLink',
    required: true,
  },
  nickname: {
    type: String, // we would want the default to be the OOL's common name depending on the user's language setting.
  }

});
*/
// router.get('/', userLinkController.getAllUserLinks);
// router.put('/:id', userLinkController.updateUserLink);
// router.delete('/:id', userLinkController.deleteUserLink);

// Correctly, should pop the req.user.id and the ool.id in.  But that has to be passed anyways so eh.
const createUserLink = async (req, res) => {
  UserLink.create(req.body)
    .then(createdUserLink => {
      console.log('UserLink created successfully:', createdUserLink);
      res.status(201).json({ message: 'UserLink created', userLink: createdUserLink });
    })
    .catch(err => {
      console.error('Error creating userLink:', err);
      res.status(400).json({ message: `Unspecified error when creating userLink.  ${err}` });
    })
};

const getAllUserLinks = async (req, res) => {
  UserLink.find()
    .then(allUserLinks => {
      console.log('All userLinks in collection:', allUserLinks); // array or null (?)
      res.status(200).json({ message: 'All userLinks', userLinks: allUserLinks });
    })
    .catch(err => {
      console.error('Error retrieving all userLinks:', err);
      res.status(500).json({ message: 'Unspecified error when retrieving all userLinks.' });
    })
}; // getAllUserLinks

const getAllUserLinksById = async (req, res) => {
  UserLink.find({ user: req.user._id }) // set in authMiddleware.  Passed in userController login.  Referenced in UserLink schema.
    //   const payload = {
    //   _id: isThereAUserWithThisEmail._id,
    //   username: isThereAUserWithThisEmail.username,
    //   email: isThereAUserWithThisEmail.email,
    //   role: isThereAUserWithThisEmail.role
    // }

//     const userLinkSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     //https://mongoosejs.com/docs/schematypes.html#objectids
//     // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
//     ref: 'User',
//     required: true,
//   },
//   ool: {
//     type: Schema.Types.ObjectId,
//     //https://mongoosejs.com/docs/schematypes.html#objectids
//     // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
//     ref: 'Ool',
//     required: true,
//   },
//   nickname: {
//     type: String, // we would want the default to be the OOL's common name depending on the user's language setting.
//   }

// });

    .then(allUserLinksById => {
      console.log('All userLinks in collection for this ID:', allUserLinksById); // array or null (?)
      res.status(200).json({ message: 'All userLinks', userLinks: allUserLinksById });
    })
    .catch(err => {
      console.error('Error retrieving all userLinksById:', err);
      res.status(500).json({ message: 'Unspecified error when retrieving all userLinks.' });
    })
};

const updateUserLink = async (req, res) => {
  const userLinkId = req.params.id;
  const options = { new: true };
  UserLink.findByIdAndUpdate(userLinkId, req.body, options)
    .then(updatedUserLink => {
      console.log('UserLink updated:', updatedUserLink); // always an array, I assume.  Could be null, I assume.
      res.status(200).json({ message: `Updated userLink`, userLink: updatedUserLink });
    })
    .catch(err => {
      console.error('Error updating userLink:', err);
      res.status(404).json({ message: `Unspecified error when updating userLink with ID ${userLinkId}` });
    })
};

const deleteUserLink = async (req, res) => {
  const userLinkId = req.params.id;
  UserLink.findByIdAndDelete(userLinkId)
    .then(deletedUserLink => { // if the userLink is not found, we get a null return.
      if (deletedUserLink) {
        console.log('Successfully deleted userLink:', deletedUserLink);
        res.status(200).json({ message: `Successfully deleted userLink:`, userLink: deletedUserLink });
      } else {
        console.log('Could not find userLink to delete.')
        res.status(404).json({ message: `UserLink with ${userLinkId} could not be found to be deleted.` });
      }
    })
    .catch(err => {
      console.error('Error deleting userLink:', err);
      res.status(500).json({ message: `Unspecified error when deleting userLink with ID ${userLinkId}` });
    })
}; // deleteUserLink

module.exports = {
  getAllUserLinksById,
  getAllUserLinks,
  createUserLink,
  updateUserLink,
  deleteUserLink,
};
