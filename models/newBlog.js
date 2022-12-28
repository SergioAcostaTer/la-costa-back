const mongoose = require("mongoose")

const newBlog = mongoose.Schema({
    
    name: {
        type: String
    },
    author: {
        type: String,
        default: "Daniel Acosta"
    },
    availability: {
        type: Boolean
    },
    date: {
        type: String,
        default: new Date().toISOString()
    },
    content:{
        type: String
    },
    image:{
        type: String
    }
    
})


module.exports = mongoose.model("blog", newBlog)