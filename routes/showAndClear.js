const express = require('express')
const bookReq = require("../models/bookReq")

const router = express.Router()

router.get("/clear", (req, res) => {
    bookReq.deleteMany({})
    .then(() => bookReq.find({}))
    .then(data => res.json(data))
})

router.get("/", (req, res) => {
    
    // if (req.headers.authorization != "sergio"){
    //     console.log(req.headers.authorization)
    //     res.json(
    //         {
    //             error : "Token not matchs"
    //         }
    //     )
    // }

    bookReq
        .find()
        .then(data => res.json(data))
})

module.exports = router;