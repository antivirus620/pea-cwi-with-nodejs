const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getResults,
  getResult,
  addResult,
  updateResult,
  deleteResult
} = require('../controllers/results');

router
  .route('/')
  .get(getResults)
  .post(addResult);

router
  .route('/:id')
  .get(getResult)
  .put(updateResult)
  .delete(deleteResult);

module.exports = router;
