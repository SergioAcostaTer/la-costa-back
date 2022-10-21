const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const clearAndShowRoutes = require("./routes/showAndClear")
const checkRoute = require("./routes/check")
const postRoute = require("./routes/post")
const checkOneDayRoute = require("./routes/checkOneDay")


require("dotenv").config()

const bookReq = require("./models/bookReq")

const app = express()
const PORT = 666

app.use(cors())

app.use("/api", clearAndShowRoutes)
app.use("/api", checkRoute)
app.use("/api", postRoute)
app.use("/api", checkOneDayRoute)



mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB working"))


app.listen(process.env.PORT || PORT, console.log("Server running on " + (process.env.PORT || PORT)))