const express = require('express');
const router = express.Router({ mergeParams: true });

const Result = require('../../models/organizationLine/Result');
const advanceResults = require('../../middlewares/advanceResults');
const { protect, authorize } = require('../../middlewares/auth');
const {
  getResults,
  getResult,
  addResult,
  updateResult,
  deleteResult
} = require('../../controllers/organizationLine/results');

router
  .route('/')
  .get(
    advanceResults(Result, {
      path: 'line',
      select: 'peaCode lineName'
    }),
    getResults
  )
  .post(protect, authorize('admin', 'pea'), addResult);

router
  .route('/:id')
  .get(getResult)
  .put(protect, authorize('admin', 'pea'), updateResult)
  .delete(protect, authorize('admin', 'pea'), deleteResult);

module.exports = router;
