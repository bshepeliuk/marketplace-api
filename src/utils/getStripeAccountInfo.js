import { StripeApiService } from '../services/StripeApiService';
import { StripeModelService } from '../services/StripeModelService';

const getStripeAccountByUserId = async (userId) => {
  const accountFromDB = await StripeModelService.findAccountByUserId(userId);

  let stripeAccount = null;

  if (accountFromDB !== null) {
    const account = await StripeApiService.getAccountById(
      accountFromDB.accountId
    );

    stripeAccount = {
      id: account.id,
      isActive: account.details_submitted,
    };
  }

  return stripeAccount;
};

export default getStripeAccountByUserId;
