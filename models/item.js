const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = mongoose.Schema({

    name : {
        required : true,
        type : String
    },
    price : {
        require : true,
        type : Number
    },
    category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'category',
            require : true
        }
    
})

module.exports = mongoose.model('item',itemSchema)

