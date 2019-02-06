const express = require('express');
const faker = require('faker');
const router = express.Router();

// Load User model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({ msg: 'users works' }));

// @route   GET api/users/all_users
// @desc    Get all users
// @access  Public
router.get('/all_users', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No posts found' }));
});


module.exports = router;
