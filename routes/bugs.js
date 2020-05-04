const express = require('express');
const { protect } = require('../middleware/auth');

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

router
  .route('/')
  .get(protect, advancedResults(Bug, 'Media'), getBugs)
  .post(protect, createBug);

router
  .route('/:id')
  .get(protect, getBug)
  .put(protect, updateBug)
  .delete(protect, deleteBug);

module.exports = router;
