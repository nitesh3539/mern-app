const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemList = new Schema({
    name : {
        type : String,
        required : true
    },
    date : {
        type : String,
        default : Date.now
    }
})

module.exports = mongoose.model('item', itemList)