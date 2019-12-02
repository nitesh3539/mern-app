const express = require('express');
const bodyPrser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose')

const app = express();
const router = require('./src/routes/start')
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin: *');
res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    next();
  });

app.use(bodyPrser.json())

// app.use(cors)







// app.get('/getProduct',(req,res,next) => {
//     res.status(200).json({productList})
// })

// app.post('/addProduct',(req,res,next) => {
//     const title = req.body.title
//     const price = req.body.price

//     console.log("req", req)
//     // if(!title || title.length == 0 || !price || price <0){
//     //     return res.status(422).json({
//     //         message : 'Invalid format'
//     //     })
//     // }
//     productList.push({id : productList.length + 1, title : title, price : price});
//     res.status(201,).json({
//         message : 'Created Successfully',
//         productList : productList
//     });
// })
// mongodb+srv://nitesh0129:<password>@cluster0-wntx2.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://nitesh0129:nitesh0129@@cluster0-rdmmx.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true,
reconnectTries: 30,
reconnectInterval: 500, })
        .then((data) => {
            console.log('connected to db successfully')
        })
        .catch(err => console.log(err))

app.use('/',router)

app.listen(8000);