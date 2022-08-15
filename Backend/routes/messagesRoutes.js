const express = require('express')
const router = express.Router();
const { getMessage, insertMessage, getRecentlyContacted } = require('../controllers/messagesController')


router.get('/:sender/to/:receiver', getMessage)

router.post('/message', insertMessage)

router.get('/:sender/contacts', getRecentlyContacted);

module.exports = router;
