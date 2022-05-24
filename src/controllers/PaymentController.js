import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { items, customer } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    customer_email: customer.email,
    mode: 'payment',
    success_url: `${process.env.CLIENT_DOMAIN}/checkout-success`,
    cancel_url: `${process.env.CLIENT_DOMAIN}/checkout-cancel`,
  });

  res.status(200).send({ sessionId: session.id });
};
