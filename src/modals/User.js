const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userList = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    register_date : {
        type : String,
        default : Date.now
    }
})

module.exports = mongoose.model('user', userList)