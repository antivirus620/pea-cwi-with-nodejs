const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth');

const { protect } = require('../middlewares/auth');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/me').get(protect, getMe);

module.exports = router;
