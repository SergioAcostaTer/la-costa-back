const mongoose = require("mongoose")

const user = mongoose.Schema({
    
    email: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: String,
        default: new Date().toISOString()
    },
    name:{
        type: String,
    }
    
})


module.exports = mongoose.model("user", user)