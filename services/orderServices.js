const orderSchema = require('../models/order')

const saveOrder = function(obj){
    console.log(obj)
    let order = new orderSchema(obj)
    return order.save()
}

const getOrder = function(params){
    console.log(params)
    return orderSchema.find().populate('items.item').exec()
}

module.exports = {saveOrder, getOrder}