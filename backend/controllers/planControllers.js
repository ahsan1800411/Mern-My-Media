const Plan = require('../db/plan');

exports.createPlan = async (req, res) => {
  try {
    const { name, languages } = req.body;

    const planExists = await Plan.findOne({ name, languages });

    if (planExists) {
      return res.status(400).json({
        status: false,
        message: 'Plan Already with this name',
      });
    }

    const plan = await Plan.create(req.body);

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});

    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};
exports.getSinglePlan = async (req, res) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};
exports.updatePlan = async (req, res) => {
  const { id } = req.params;

  const plan1 = await Plan.findOne({ _id: id });

  if (!plan1) {
    return res.status(400).json({ success: false, message: 'Plan not found' });
  }

  const plan = await Plan.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ plan });
};

exports.deletePlan = async (req, res) => {
  const { id } = req.params;

  const plan = await Plan.findOne({ _id: id });

  if (!plan) {
    return res.status(400).json({ success: false, message: 'Plan not found' });
  }

  await plan.remove();
  res.status(200).json({ msg: 'Plan Deleted ' });
};

exports.getAllFilteredPlans = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(23, 59, 59, 999);

  const filteredPlans = await Plan.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
  ]);

  res.status(200).json({ filteredPlans });
};
