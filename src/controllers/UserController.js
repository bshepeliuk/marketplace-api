import UserService from '../services/UserService';
import getStripeAccountByUserId from '../utils/getStripeAccountInfo';

export const getAccountInfo = async (req, res) => {
  const { userId } = req.session.current;

  const [user, stripeAccount] = await Promise.allSettled([
    UserService.getById(userId),
    getStripeAccountByUserId(userId),
  ]);

  res
    .status(200)
    .send({ user: user.value, stripeAccount: stripeAccount.value });
};
