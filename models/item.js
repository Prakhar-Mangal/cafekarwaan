const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = mongoose.Schema({

    name : {
        required : true,
        type : String
    },
    category : 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'category'
        }
    
})

module.exports = mongoose.model('item',itemSchema)

