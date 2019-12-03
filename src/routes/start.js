const express = require('express');

const app = require('../controllers/start')

const user = require('../controllers/user')

const router = express.Router();


router.get('/getProduct',app.getProduct)

router.post('/addProduct',user.auth, app.addProduct)

router.delete('/deleteProduct/:id', user.auth, app.deleteProduct)

module.exports = router