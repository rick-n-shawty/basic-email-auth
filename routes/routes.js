const express = require('express')
const router = express.Router()
const auth = require('../auth')
const {verifyLink, signup, login, data} = require('../controllers/controllers')

router.get('/verify_token/:token', verifyLink)

router.post('/signup', signup)


router.post('/login', login)

router.get('/data', auth, data)

module.exports = router