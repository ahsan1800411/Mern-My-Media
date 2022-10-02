const Transaction = require('../db/transaction');
const Plan = require('../db/plan');
const User = require('../db/User');

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).limit(5);
    // const transactionForPlan = await Transaction.find().select({
    //   planId: 1,
    //   planName: 1,
    // });
    // console.log(transactionForPlan);
    // const plans = await Plan.find();
    res.status(201).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.data.userId });
    const transactions = await Transaction.find({ email: user.email });
    // const transaction = Object.assign({}, transactions);

    // const plan = await Plan.findById({ _id: transaction[0].planId });

    res.status(201).json({
      success: true,
      transactions,
      // plan,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};

exports.getUserFilteredTransactions = async (req, res) => {
  const user = await User.findOne({ _id: req.user.data.userId });

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(23, 59, 59, 999);

  const filteredTransactions = await Transaction.aggregate([
    { $match: { email: user.email } },
    {
      $match: {
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
  ]);

  res.status(200).json({ filteredTransactions });
};
exports.getAllFilteredTransactions = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(23, 59, 59, 999);

  const filteredTransactions = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
  ]);

  res.status(200).json({ filteredTransactions });
};
