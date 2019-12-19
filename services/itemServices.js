const itemSchema = require('../models/item')

const saveItem = function(obj){
    console.log(obj)
    let item = new itemSchema(obj)
    return item.save()
}

const getItem = function(params){
    console.log(params)
    return itemSchema.find().populate('category').exec()
}

module.exports = {saveItem, getItem}