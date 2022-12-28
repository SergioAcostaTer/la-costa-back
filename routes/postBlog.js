const express = require("express");
const newBlog = require("../models/newBlog");

const router = express.Router();

router.post("/post", async (req, res) => {

  const post = req.body.post

  const blog = await newBlog(post);

  blog.save();

  res.json(blog);
});

module.exports = router;
