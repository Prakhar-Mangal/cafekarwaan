const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = mongoose.Schema({

    orderno : {
        required : true,
        type : String
    },
    items : [
        {
            item : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'item',
                required : false
            },
            quantity : {
                type : Number,
                required : false
            }
        }
    ]
    
})

module.exports = mongoose.model('order',orderSchema)

