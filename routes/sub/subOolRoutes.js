const router = require('express').Router();
const oolController = require('../../controllers/oolController');

router.get('/', oolController.getAllOolsByUserId);
router.post('/', oolController.createOolRestrict);

module.exports = router;