const express = require("express");
var path = require("path");
const router = express.Router();

function checkOrigin (origin) {
  if (origin === process.env.URL) {
    return true;
  } else {
    return false;
  }
}

router.get("/getfile/:name/:type", async (req, res) => {
  if (checkOrigin(req.headers.referer)) {
    const { name, type } = req.params;

    var options = {
      root: path.join(__dirname, `../songs/${name}/`),
    };

    const file = `./${name}.${type}`;

    console.log(file, path.join(__dirname));

    res.sendFile(file, options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", file);
      }
    });
  } else {
    res.send("not allowed");
  }
});

module.exports = router;
