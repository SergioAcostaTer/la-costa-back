// This is your test secret API key.
const stripe = require("stripe")(
  "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"
);
const express = require("express");

const router = express.Router();

const YOUR_DOMAIN = "http://localhost:3000";

router.post("/checkout", async (req, res) => {
  const { priceItem, lastUrl, beatName, email, img } = req.body;

  const taxRate = await stripe.taxRates.create({
    display_name: "IVA",
    inclusive: true,
    percentage: 21,
    country: "ES",
    jurisdiction: "Canary Island",
    description: "IVA",
  });

  // const product = await stripe.products.create({
  //   name: `Beat producido por La Costa Sounds - ${beatName}`,
  //   images: [img]
  // });


  const price = await stripe.prices.create({
    unit_amount: priceItem*100,
    currency: "eur",
    tax_behavior: "inclusive",
    product: "prod_NGxsiOSu6RSeo1",

  });

  

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: 1,
        tax_rates: [taxRate.id]
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success?beat=${beatName}`,
    cancel_url: `${lastUrl}`,

  });
  // console.log(email)
  res.json({...session, email});
});


module.exports = router;
