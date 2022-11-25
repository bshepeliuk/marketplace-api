import { StripeEvents } from '../constants';
import { StripeApiService } from '../services/StripeApiService';
import { StripeModelService } from '../services/StripeModelService';
import transferPaymentsToSellersBySession from '../utils/transferPaymentsToSellersBySession';
import UserService from '../services/UserService';
import getStripeAccountByUserId from '../utils/getStripeAccountInfo';
import createOrderByPaymentSession from '../utils/createOrderByPaymentSession';

export const createCheckoutSession = async (req, res) => {
  const { items, customer } = req.body.parsed;

  const session = await StripeApiService.createCheckoutSession({
    lineItems: items,
    customer,
  });

  res.status(200).send({ sessionId: session.id });
};

export const onBoardUser = async (req, res) => {
  const { userId } = req.session.current;

  const user = await UserService.getById(userId);

  let accountId;
  // TODO: refactoring;
  if (user.stripe === null) {
    const account = await StripeApiService.createAccount({ type: 'express' });

    StripeModelService.create({ accountId: account.id, userId });

    accountId = account.id;
  } else {
    accountId = user.stripe.accountId;
  }

  const accountLink = await StripeApiService.createAccountLink(accountId);

  res.status(200).send({ accountLink: accountLink.url });
};

export const stripeWebHook = async (req, res) => {
  const payload = req.body.raw;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = StripeApiService.createConstructorEvt({ payload, sig });
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case StripeEvents.checkoutSessionCompleted: {
      transferPaymentsToSellersBySession(event.data.object);
      createOrderByPaymentSession(event.data.object);
    }
  }

  res.status(200).send();
};

export const getSellerBalance = async (req, res) => {
  const { userId } = req.session.current;

  const account = await getStripeAccountByUserId(userId);
  const balance = await StripeApiService.getBalanceByAccountId(account.id);

  res.status(200).send({ balance });
};

export const getSellerCharges = async (req, res) => {
  const { limit, startChunkId, endChunkId } = req.query;
  const { userId } = req.session.current;

  const account = await getStripeAccountByUserId(userId);
  const charges = await StripeApiService.getChargesByAccountId({
    limit,
    startChunkId,
    endChunkId,
    accountId: account.id,
  });

  res.status(200).send({ charges });
};

export const getSellerPayouts = async (req, res) => {
  const { limit, startChunkId, endChunkId } = req.query;
  const { userId } = req.session.current;

  const account = await getStripeAccountByUserId(userId);
  const payouts = await StripeApiService.getPayoutsByAccountId({
    limit,
    startChunkId,
    endChunkId,
    accountId: account.id,
  });

  res.status(200).send({ payouts });
};

export const getSellerTransfers = async (req, res) => {
  const { limit, startChunkId, endChunkId } = req.query;
  const { userId } = req.session.current;

  const account = await getStripeAccountByUserId(userId);
  const transfers = await StripeApiService.getTransfersByAccountId({
    limit,
    startChunkId,
    endChunkId,
    accountId: account.id,
  });

  res.status(200).send({ transfers });
};

export const getAccountEvents = async (req, res) => {
  const { userId } = req.session.current;

  const account = await getStripeAccountByUserId(userId);
  const events = await StripeApiService.getEventsByAccountId(account.id);

  res.status(200).send({ events });
};
