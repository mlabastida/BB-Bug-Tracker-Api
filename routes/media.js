const express = require('express');
const { createMedia, deleteMedia } = require('../controllers/media');

const router = express.Router();

router.route('/').post(createMedia);

router.route('/:id').delete(deleteMedia);

module.exports = router;
