const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../../middlewares/auth');
const {
  getResults,
  getResult,
  addResult,
  updateResult,
  deleteResult
} = require('../../controllers/organizationLine/results');

router
  .route('/')
  .get(getResults)
  .post(protect, addResult);

router
  .route('/:id')
  .get(getResult)
  .put(protect, updateResult)
  .delete(protect, deleteResult);

module.exports = router;
