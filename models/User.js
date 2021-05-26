const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({ 
    googleId:{type:String},
    credits:{type:Number, default:0}

})

module.exports = mongoose.model("email-user", userSchema)