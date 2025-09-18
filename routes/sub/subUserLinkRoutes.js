// subs/:id PUT DELETE (they can edit or delete themselves)
// subs/ools GET ALL (replicant), POST (unique, RESTRICTED access)
// subs/userlinks GET (only for the sub), POST
// subs/userlinks/:id PUT, DELETE

const router = require('express').Router();
const userLinkController = require('../../controllers/userLinkController');

router.get('/', userLinkController.getAllUserLinksById);
router.post('/', userLinkController.createUserLink);
router.put('/:id', userLinkController.updateUserLink);
router.delete('/:id', userLinkController.deleteUserLink);

module.exports = router;
//Note:  Fix update and delete routes, as they don't check if the sub is the owner of the resource!  if get / works, then filter function should work as well.  (Note that eventually should pop in role || id)