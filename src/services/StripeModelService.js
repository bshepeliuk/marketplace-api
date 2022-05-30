import models from '../database';

export const StripeModelService = {
  create({ userId, accountId }) {
    return models.Stripe.create({
      userId,
      accountId,
    });
  },
  findAccountByUserId(userId) {
    return models.Stripe.findOne({
      where: { userId },
    });
  },
};
