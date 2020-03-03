const express = require('express');
const router = express.Router();

const advanceResults = require('../../middlewares/advanceResults');
const Line = require('../../models/organizationLine/Line');
const { protect, authorize } = require('../../middlewares/auth');

// Import from controllers
const {
  getLines,
  getLine,
  createLine,
  updateLine,
  deleteLine
} = require('../../controllers/organizationLine/lines');

// Include other resource routers
const resultRouter = require('./results');

// Re-Route into other resource routers
router.use('/:lineId/results', resultRouter);
// ส่งต่อไปให้ resultRouter
// อย่าลืมตั้งค่า mergeParams: true ที่ Router

router
  .route('/')
  .get(advanceResults(Line), getLines)
  .post(protect, authorize('admin', 'pea'), createLine);

router
  .route('/:id')
  .get(getLine)
  .put(protect, authorize('admin', 'pea'), updateLine)
  .delete(protect, authorize('admin', 'pea'), deleteLine);

module.exports = router;
