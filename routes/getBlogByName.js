const express = require("express");
const newBlog = require("../models/newBlog");

const router = express.Router();

router.get("/getbyname/:name", async (req, res) => {
  const { name } = req.params;

  const response = await newBlog.findOne({ name: name });

  res.json(response);
});

module.exports = router;
