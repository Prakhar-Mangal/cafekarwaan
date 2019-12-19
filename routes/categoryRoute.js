const app = module.exports = require('express')()

const categoryServices = require('../services/categoryServices')


app.post('/save',(req,res)=>{
   (async()=>{
       try{
        categoryPromise = await categoryServices.saveCategory(req.body)
        res.json({
            success : true,
            data : categoryPromise
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
        
            categoryPromise = await categoryServices.getCategory(req.body)
            res.json({
                success : true,
                data : categoryPromise
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