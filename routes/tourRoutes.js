const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkId);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/stats').get(getTourStats);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

module.exports = router;
