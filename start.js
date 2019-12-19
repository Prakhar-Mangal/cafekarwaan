const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes');
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/', routes);

app.get('/available',(req,res)=>{
    res.send({
        'avalaible' : true
    })
})

mongoose.connect('mongodb+srv://test:test@cluster0-986es.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to mongo")
});
app.get('/',(req,res)=>{
    res.send('hello world')
})




app.listen(process.env.PORT || 3000)