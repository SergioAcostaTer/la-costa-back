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

router.post("/makeorder", async (req, res) => {
  if (checkOrigin(req.headers.referer)) {
    const { email, name, plan, password, genre } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "no-reply@lacostaestudio.com",
        pass: "Noreplylacosta0*",
      },
      tls: {
        servername: "hostinger.com",
      },
    });

    let mp3, wav, tracks, license;

    if (plan == 1995) {
      mp3 = true;
      wav = false;
      tracks = false;
      license = true;
    }
    if (plan == 2995) {
      mp3 = true;
      wav = true;
      tracks = false;
      license = true;
    }
    if (plan == 7995) {
      mp3 = true;
      wav = true;
      tracks = true;
      license = true;
    }
    if (plan == 19995) {
      mp3 = true;
      wav = true;
      tracks = true;
      license = true;
    }

    const newOrder = await order({
      email,
      name,
      password,
      mp3,
      wav,
      tracks,
      license,
      genre,
    });

    const exist = (await (await order.find({ email, name })).length) > 0;

    if (!exist) {
      newOrder.save();

      let info = await transporter.sendMail({
        from: '"La Costa Sounds 👻" <no-reply@lacostaestudio.com>', // sender address
        to: email, // list of receivers
        subject: "Confirmación de tu pedido", // Subject line
        text: `
            Para acceder al contenido debes de acceder con estas claves:
            
            Correo: ${email.toLowerCase()}
            Clave: ${password}
        `, // plain text body
        html: `
        Para acceder al contenido debes de acceder con estas claves:
        
        Correo: ${email.toLowerCase()}
        Clave: ${password}
    `, // html body
      });
    }

    res.json(newOrder);
  } else {
    res.send("not allowed");
  }
});

module.exports = router;
