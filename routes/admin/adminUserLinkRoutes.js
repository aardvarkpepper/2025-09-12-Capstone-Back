/**
 * admin/userlinks GET (all) (creation is a user thing)
admin/userlinks/:id PUT, DELETE (in case administrators need to do something)
 */

const router = require('express').Router();
const userLinkController = require('../../controllers/userLinkController');

router.get('/', userLinkController.getAllUserLinks);
router.post('/', userLinkController.createUserLink);
router.put('/:id', userLinkController.updateUserLink);
router.delete('/:id', userLinkController.deleteUserLink);

module.exports = router;