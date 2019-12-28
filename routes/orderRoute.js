const app = module.exports = require('express')()

const orderServices = require('../services/orderServices')

app.post('/save',(req,res)=>{
    (async()=>{
        try{
            console.log(req.body)
            orderPromise = await orderServices.saveOrder(req.body)
            res.json({
                success : true,
                data : orderPromise
            })
        }
        catch(e){
            console.log(e)
            res.json({
                success : false
            })
        }
    })();
})

app.get('/get',(req,res)=>{
    (async()=>{
        try{
            orderPromise = await orderServices.getOrder(req.body)
            res.json({
                success : true,
                data : orderPromise
            })
        }
        catch(e){
            console.log(e)
            res.json({
                success : false
            })

        }
    })()
})