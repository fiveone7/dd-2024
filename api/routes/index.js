const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const user = require('./user.js');
const material = require('./material.js');
const dialogue = require('./dialogue.js');

router.use('/auth', auth);
router.use('/user', user);
router.use('/material', material);
router.use('/dialogue', dialogue);

module.exports = router;