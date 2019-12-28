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
                required : true
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],
   time : { type : Date, default: Date.now }
    
})

module.exports = mongoose.model('order',orderSchema)

