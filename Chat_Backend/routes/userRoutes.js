const express = require('express')
const router = express.Router();
const { register, logIn, getAllUsers } = require('../controllers/userController')


router.post('/login', logIn)

router.post('/register', register);

router.get('/', getAllUsers)

module.exports = router;