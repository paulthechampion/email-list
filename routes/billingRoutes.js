const express = require("express")
const app = express()
const keys = require("../config/keys")
const strpie = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin")


app.post("/stripe",requireLogin,async(req,res)=>{

 const charge= await strpie.charges.create({
                amount:500,
                currency:"usd",
                description:"$5 for 5 credits",
                source: req.body.id,
    }) 
   
    req.user.credits +=5
    const user = await req.user.save()
    res.send(user)
})

module.exports=app
 