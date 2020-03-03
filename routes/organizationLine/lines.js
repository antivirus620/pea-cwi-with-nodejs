const express = require('express');
const router = express.Router();

const { protect } = require('../../middlewares/auth');

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
  .get(getLines)
  .post(protect, createLine);

router
  .route('/:id')
  .get(getLine)
  .put(protect, updateLine)
  .delete(protect, deleteLine);

module.exports = router;
