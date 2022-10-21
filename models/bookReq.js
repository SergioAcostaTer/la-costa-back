const mongoose = require("mongoose")

const bookReq = mongoose.Schema({
    
    year: {
        type: Number
    },
    day: {
        type: Number
    },
    guests: {
        type: Number
    },
    name: {
        type: String
    },
    availability: {
        type: Boolean
    }, 
    bookID: {
        type: String
    },
    
})


module.exports = mongoose.model("book", bookReq)