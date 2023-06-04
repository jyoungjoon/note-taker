const express = require('express');
const router = express.Router();
const { sendUser } = require('../controllers/indexController');

router.get(`/`, sendUser);
router.get(`/notes`, sendUser);

module.exports = router;
