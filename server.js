const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoutes")
const apiRoutes = require("./routes/billingRoutes")
const port= process.env.PORT || 5000
const keys = require("./config/keys") 

mongoose.connect(keys.mongoKey,{
    useUnifiedTopology:true, useNewUrlParser:true
})
const db= mongoose.connection;
db.on('error',error=>console.error(error));
db.once('open',()=>console.log('Connected to mongoose'));

require("./services/passport")

app.use(
    cookieSession({
        maxAge:30 * 24 *60 *60*1000,
        keys:[keys.cookieKey]
    })
)
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoutes)
app.use("/api",apiRoutes)

if(process.env.NODE_ENV === "production"){
    const path = require('path');

    // app.use(express.static(path.join(__dirname, '../client/build')));

    // app.get("*",(req,res)=>{
    //     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
    // })

    app.use(express.static("client/build"));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })

 
}

app.listen(port,()=>{
    console.log("listening to port 5000")
})