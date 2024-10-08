const stripe = require("stripe")(
  "sk_test_51PoJ9AEYPKZSSLXyLiKMIDgMiNpHF8vIJtrY2KISRO9twadf14zFIL0eUEK6HpaxkkTl3MMhQsodDE5b5XqVRRH200qh8JtHbj"
);

async function payment(req, resp) {
  try {
    const { total } = req.body;
    const totalAmountInPaisa = total * 100;

    let paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountInPaisa,     // amount should be in smallest unit of that currency("paisa" for npr currency).
      currency: "npr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    resp.status(201).json({
      message: "Payment Intent created",
      data: {
        clientSecret: paymentIntent.client_secret,
        transactionId: paymentIntent.id,
      },
      success: true,
      error: false,
    });
  } catch (err) {
    resp.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = payment;
