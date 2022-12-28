const express = require("express");
const newBlog = require("../models/newBlog");

const router = express.Router();

router.get("/getall", async (req, res) => {
  const response = await newBlog.find();

  res.json(response);
});

module.exports = router;
