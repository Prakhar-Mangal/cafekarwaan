const orderSchema = require('../models/order')

const saveOrder = function(obj){
    console.log(obj)
    let order = new orderSchema(obj)
    return order.save()
}

// const getItem = function(params){
//     console.log(params)
//     return itemSchema.find().populate('category').exec()
// }

module.exports = {saveOrder}