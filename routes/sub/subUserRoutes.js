// subs/:id PUT DELETE (they can edit or delete themselves)
// subs/ools GET ALL (replicant), POST (unique, RESTRICTED access)
// subs/userlinks GET (only for the sub), POST
// subs/userlinks/:id PUT, DELETE

const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;