const express = require('express');
const { check, validationResult } = require('express-validator');
const { getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, getAllUsers);

module.exports = router;
