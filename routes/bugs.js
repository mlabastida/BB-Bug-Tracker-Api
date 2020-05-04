const express = require('express');
const {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
} = require('../controllers/bugs');

const Bug = require('../models/Bug');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/').get(advancedResults(Bug, 'Media'), getBugs).post(createBug);

router.route('/:id').get(getBug).put(updateBug).delete(deleteBug);

module.exports = router;
