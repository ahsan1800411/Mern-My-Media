const express = require('express');
const { getAllKeys, deleteApiKeys } = require('../controllers/keyController');
const router = express();

router.route('/:role').get(getAllKeys);
router.route('/:key').delete(deleteApiKeys);
module.exports = router;
