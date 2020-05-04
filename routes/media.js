const express = require('express');
const { createMedia, deleteMedia } = require('../controllers/media');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/:bug_id').post(protect, createMedia);

router.route('/:id').delete(protect, deleteMedia);

module.exports = router;
