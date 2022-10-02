const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  getUserTransactions,
  getUserFilteredTransactions,
  getAllFilteredTransactions,
} = require('../controllers/transactionControllers');
const { authenticatedUser } = require('../middleware/auth');

const router = express();

router.route('/').post(createTransaction).get(getAllTransactions);
router.route('/all').post(getAllFilteredTransactions);

router.route('/users').get(authenticatedUser, getUserTransactions);
router
  .route('/users-filtered')
  .post(authenticatedUser, getUserFilteredTransactions);

module.exports = router;
