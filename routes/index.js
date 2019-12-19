const app = module.exports = require('express')()

app.use('/item',require('./itemRoute'))
app.use('/category',require('./categoryRoute'))