const express = require("express");
const order = require("../models/order");
const nodemailer = require("nodemailer");

const router = express.Router();

function checkOrigin(origin) {
  if (origin === process.env.URL) {
    return true;
  } else {
    return false;
  }
}

router.get("/findorder/:email/:password", async (req, res) => {
  if (checkOrigin(req.headers.referer)) {
    const { email, password } = req.params;

    const actual = await order.find({ email, password });

    res.json(actual);
  } else {
    res.send("not allowed");
  }
});

module.exports = router;
