const express = require('express')

const router = express.Router()

const user = require('../controllers/user')


router.post('/addUser',  user.addUser)
router.get('/getUser/', user.auth, user.getUser)
router.delete('/deleteUser/:email', user.auth, user.deleteUser)
router.post('/validateUser', user.validateUser)
router.post('/logouteUser', user.auth, user.logoutUser)


module.exports = router