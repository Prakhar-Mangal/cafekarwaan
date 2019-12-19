const app = module.exports = require('express')()

const itemServices = require('../services/itemServices')


app.post('/save',(req,res)=>{
   (async()=>{
       try{
        itemPromise = await itemServices.saveItem(req.body)
        res.json({
            success : true,
            data : itemPromise
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
            //console.log('id--> '+req.params.id)
            itemPromise = await itemServices.getItem(req.body)
            res.json({
                success : true,
                data : itemPromise
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