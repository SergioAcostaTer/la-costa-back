const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const clearAndShowRoutes = require("./routes/showAndClear")
require("dotenv").config()

const bookReq = require("./models/bookReq")

const app = express()
const PORT = 666

app.use(cors())

app.use("", clearAndShowRoutes)

let data = []

function refreshData(){
    bookReq
        .find()
        .then(dataElements => data = dataElements)
}

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB working"))



app.get('/check/:date', (req, res) => {
    refreshData()

    const {date} = req.params

    let entryDay = Number(date.substring(0,3))
    let leaveDay = Number(date.substring(3,6))
    let year = Number(date.substring(6,)) 

    const daysToCheck = []
    for (let i = 0; i < leaveDay - entryDay+1 ; i++) {
        daysToCheck.push(entryDay + i)
    }

    function checkDays(array){
        let aux = true
        array.map(day => {
            let obj = data.find(date => date.day == day && date.year == year)
    
            if (obj){
                obj.availability == false ? aux = false : ""
            }
        })
        return aux
    }

    const isAvailable = checkDays(daysToCheck)

    refreshData()

    
    res.send({status : isAvailable})
    
})

app.get("/post/:date/:guests/:name", (req, res) => {

    refreshData()
    const {date, guests, name} = req.params


    let entryDay = Number(date.substring(0,3))
    let leaveDay = Number(date.substring(3,6))
    let year = Number(date.substring(6,)) 

    const daysToCheck = []
    for (let i = 0; i < leaveDay - entryDay+1 ; i++) {
        daysToCheck.push(entryDay + i)
    }

    function checkDays(array){
        let aux = true
        array.map(day => {
            let obj = data.find(date => date.day == day && date.year == year)
    
            if (obj){
                obj.availability == false ? aux = false : ""
            }
        })
        return aux
    }

    const isAvailable = checkDays(daysToCheck)
    refreshData()


    if(isAvailable){
        daysToCheck.map(day => {

            const book = bookReq({
                year: year,
                day: day, 
                guests: guests,
                name: name,
                availability: false,
                bookID: String(entryDay)+String(leaveDay)+year+guests
            })  
            book
                .save()
                .then(() => res.json({status: "Data created succefully"}))
        })
        refreshData()
    }
    else{
        res.json({
            status:"Date not available"
        })
        refreshData()
    }
})


app.listen(process.env.PORT || PORT, console.log("Server running on " + (process.env.PORT || PORT)))