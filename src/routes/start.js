const express = require('express');

const app = require('../controllers/start')

const router = express.Router();


router.get('/getProduct',app.getProduct)

router.post('/addProduct',app.addProduct)

router.delete('/deleteProduct/:id',app.deleteProduct)

module.exports = router