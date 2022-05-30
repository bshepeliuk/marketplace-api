import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BACKEND_DOMAIN = `http://0.0.0.0:3000`;

export const StripeApiService = {
  createAccount({ type }) {
    return stripe.accounts.create({
      type,
    });
  },
  createAccountLink(accountId) {
    return stripe.accountLinks.create({
      type: 'account_onboarding',
      account: accountId,
      refresh_url: `${BACKEND_DOMAIN}/api/onboard-user/refresh`,
      return_url: `${process.env.CLIENT_DOMAIN}/checkout-cancel`,
    });
  },
  createCheckoutSession({ lineItems, customer }) {
    return stripe.checkout.sessions.create({
      line_items: lineItems,
      customer_email: customer.email,
      phone_number_collection: {
        enabled: true,
      },
      mode: 'payment',
      success_url: `${process.env.CLIENT_DOMAIN}/checkout-success`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/checkout-cancel`,
    });
  },
  getAccountById(accountId) {
    return stripe.accounts.retrieve(accountId);
  },
  // eslint-disable-next-line camelcase
  createTransfer({ amount, currency, source_transaction, destination }) {
    const transfer = stripe.transfers.create({
      amount,
      currency,
      // eslint-disable-next-line camelcase
      source_transaction,
      destination,
    });

    return transfer;
  },
  getLineItemsBySessionId(sessionId) {
    return stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ['data.price.product'],
    });
  },
  createConstructorEvt({ sig, payload }) {
    return stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  },
  getPaymentIntentById(id) {
    return stripe.paymentIntents.retrieve(id);
  },
  balance() {
    return stripe.balance.retrieve();
  },
};
