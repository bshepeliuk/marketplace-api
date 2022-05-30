import { StripeEvents } from '../constants';
import { StripeApiService } from '../services/StripeApiService';
import { StripeModelService } from '../services/StripeModelService';
import transferPaymentsToSellersBySession from '../utils/transferPaymentsToSellersBySession';
import { UserService } from '../services/UserService';

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

export const stripeWebHook = async (request, res) => {
  const payload = request.body.raw;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = StripeApiService.createConstructorEvt({ payload, sig });
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case StripeEvents.checkoutSessionCompleted: {
      transferPaymentsToSellersBySession(event.data.object);
    }
  }

  res.status(200).send();
};
