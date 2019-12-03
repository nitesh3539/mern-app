const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const app = express();
const router = require('./src/routes/start')
const user = require('./src/routes/user')



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    next();
});

app.use(express.json())

mongoose.connect('mongodb+srv://nitesh0129:nitesh0129@@cluster0-rdmmx.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useCreateIndex: true,
    reconnectTries: 30,
    reconnectInterval: 500,
})
    .then((data) => {
        console.log('connected to db successfully')
    })
    .catch(err => console.log(err))

app.use('/', router)
app.use('/', user)

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('front-end/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 8000

app.listen(port);