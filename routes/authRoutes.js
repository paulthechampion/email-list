const express = require("express")
const app = express()
const passport = require("passport")

app.get("/google",
        passport.authenticate("google",{
        scope:["profile","email"]
    })
)

app.get("/google/callback", passport.authenticate("google"),(req,res)=>{
    res.redirect("/surveys")
})

app.get("/api/logout",(req,res)=>{
    req.logOut()
    res.redirect("/")
})

app.get("/api/current_user",(req,res)=>{
    res.send(req.user)
})

module.exports=app
 