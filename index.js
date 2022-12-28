const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//routes
const postRoute = require("./routes/postBlog");
const getRoute = require("./routes/getAllBlogs");
const getbyName = require("./routes/getBlogByName");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 666;

app.use(cors());
app.use(express.json());

app.use("/", postRoute);
app.use("/", getRoute);
app.use("/", getbyName);
app.get("/", async (req, res) => {});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB working"));

app.listen(PORT, console.log("Server running on " + PORT));
