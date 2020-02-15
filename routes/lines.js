const express = require('express');
const router = express.Router();

// Import from controllers
const {
  getLines,
  getLine,
  createLine,
  updateLine,
  deleteLine
} = require('../controllers/lines');

// Include other resource routers
const resultRouter = require('./results');

// Re-Route into other resource routers
router.use('/:lineId/results', resultRouter);
// ส่งต่อไปให้ resultRouter
// อย่าลืมตั้งค่า mergeParams: true ที่ Router

router
  .route('/')
  .get(getLines)
  .post(createLine);

router
  .route('/:id')
  .get(getLine)
  .put(updateLine)
  .delete(deleteLine);

module.exports = router;
