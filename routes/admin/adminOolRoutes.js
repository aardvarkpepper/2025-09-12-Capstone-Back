//=====
//api/oolRoutes.

/**
 * // admin/ools GET (replicant), POST (unique, unrestricted)
// admin/ools/:id PUT, DELETE
 */

const router = require('express').Router();
const oolController = require('../../controllers/oolController');

router.get('/', oolController.getAllOols);
router.post('/', oolController.createOol);
router.put('/:id', oolController.updateOol);
router.delete('/:id', oolController.deleteOol);

module.exports = router;