import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
      // TODO: save stripe ID to user account.
      // payment_intent_data: {
      //   transfer_data: {
      //     destination: 'account.id',
      //   },
      // },
      success_url: `${process.env.CLIENT_DOMAIN}/checkout-success`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/checkout-cancel`,
    });
  },
  getAccountById(accountId) {
    return stripe.accounts.retrieve(accountId);
  },
};
