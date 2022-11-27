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
      return_url: `${process.env.CLIENT_DOMAIN}/stripe-account-success`,
    });
  },
  createCheckoutSession({ lineItems, customer }) {
    return stripe.checkout.sessions.create({
      line_items: lineItems,
      customer_email: customer.email,
      shipping_address_collection: {
        allowed_countries: ['UA'],
      },
      phone_number_collection: {
        enabled: true,
      },
      mode: 'payment',
      success_url: `${process.env.CLIENT_DOMAIN}/purchases`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/checkout-cancel`,
    });
  },
  getAccountById(accountId) {
    return stripe.accounts.retrieve(accountId);
  },
  createTransfer({ amount, currency, sourceTransaction, destination }) {
    const transfer = stripe.transfers.create({
      amount,
      currency,
      destination,
      source_transaction: sourceTransaction,
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
  getBalanceByAccountId(accountId) {
    return stripe.balance.retrieve({
      stripeAccount: accountId,
    });
  },

  getChargesByAccountId({
    accountId,
    startingAfter,
    endingBefore,
    limit = 10,
  }) {
    const options = {
      limit,
      ...(startingAfter && { starting_after: startingAfter }),
      ...(endingBefore && { ending_before: endingBefore }),
    };

    return stripe.charges.list(options, {
      stripeAccount: accountId,
    });
  },
  getPayoutsByAccountId({ accountId, startChunkId, endChunkId, limit = 10 }) {
    const options = {
      limit,
    };

    if (endChunkId) {
      options.starting_after = endChunkId;
    }

    if (startChunkId) {
      options.ending_before = startChunkId;
    }

    return stripe.payouts.list(options, {
      stripeAccount: accountId,
    });
  },
  getTransfersByAccountId({ accountId, startChunkId, endChunkId, limit = 10 }) {
    const options = {
      limit,
    };

    if (endChunkId) {
      options.starting_after = endChunkId;
    }

    if (startChunkId) {
      options.ending_before = startChunkId;
    }

    return stripe.payouts.list(options, {
      stripeAccount: accountId,
    });
  },
  getEventsByAccountId(accountId) {
    return stripe.events.list({
      stripeAccount: accountId,
    });
  },
};
