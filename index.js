const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const privatizeEndpoint = require("../middleware/private")

//routes
const postRoute = require("./routes/postBlog");
const getRoute = require("./routes/getAllBlogs");
const getbyName = require("./routes/getBlogByName");
const checkout = require("./routes/stripe")
const checkPayment = require("./routes/checkPayment")
const makeOrder = require("./routes/makeOrder")
const findOrder = require("./routes/findOrder")
const getFile = require("./routes/getFile")

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 666;

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/", postRoute);
app.use("/", getRoute);
app.use("/", getbyName);
app.use("/", checkout);
app.use("/", checkPayment);
app.use("/", makeOrder);
app.use("/", findOrder);
app.use("/", getFile);

app.get("/", async (req, res) => { res.send("WORK")});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB working"));

app.listen(PORT, console.log("Server running on " + PORT));



