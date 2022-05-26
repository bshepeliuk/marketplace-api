import { StripeApiService } from '../services/StripeApiService';

export const createCheckoutSession = async (req, res) => {
  const { items, customer } = req.body;

  const session = await StripeApiService.createCheckoutSession({
    lineItems: items,
    customer,
  });

  res.status(200).send({ sessionId: session.id });
};

export const onBoardUser = async (req, res) => {
  const account = await StripeApiService.createAccount({ type: 'express' });
  const accountLink = await StripeApiService.createAccountLink(account.id);

  res.status(200).send({ accountLink: accountLink.url });
};
