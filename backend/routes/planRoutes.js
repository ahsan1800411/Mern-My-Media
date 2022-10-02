const express = require('express');
const {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan,

  getSinglePlan,
  getAllFilteredPlans,
} = require('../controllers/planControllers');

const router = express();

router.route('/create').post(createPlan);
router.route('/').get(getAllPlans);
router.route('/single/:id').get(getSinglePlan);
router.route('/all').post(getAllFilteredPlans);
router.route('/update/:id').patch(updatePlan).delete(deletePlan);

module.exports = router;
