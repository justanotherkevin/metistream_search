const express = require('express');
const faker = require('faker');
const router = express.Router();

// Load User model
const User = require('../models/User');

// @route   GET api/users/search/something
// @desc    Search in user name and description for match
// @access  Public
router.get('/search/:partname', (req, res) => {
  console.log(req.params.partname);
  User.find({
    name: { $regex: `${req.params.partname}`, $options: 'i' },
    details: { $regex: `${req.params.partname}`, $options: 'i' },
  })
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No posts found' }));
});

// @route   GET api/users/all
// @desc    Get all users
// @access  Public
router.get('/all', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No posts found' }));
});

module.exports = router;
