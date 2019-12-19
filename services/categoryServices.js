const categorySchema = require('../models/category')

const saveCategory = function(obj){
    console.log(obj)
    let cat = new categorySchema(obj)
    return cat.save()
}

const getCategory = function(params){
    console.log(params)
    return categorySchema.find(params).exec()
}

module.exports = {saveCategory, getCategory}