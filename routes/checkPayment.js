// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MVBv6AqW0WhazXsRf9Wck7FpHDop2stxuk1EB6QvAFqbXwOgdOGTZAf3AG1Pakc4M3TMKspJA8d6DBhpcmXPVpo00WrncC850"
);
const express = require("express");

const router = express.Router();
    
const YOUR_DOMAIN = "http://localhost:3000";

router.get("/checkPayment/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const session = await stripe.checkout.sessions.retrieve(id);

  res.json(session);
});

module.exports = router;
