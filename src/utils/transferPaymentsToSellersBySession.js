import { StripeApiService } from '../services/StripeApiService';
import { StripeModelService } from '../services/StripeModelService';

async function transferPaymentsToSellersBySession(session) {
  const paymentIntent = await StripeApiService.getPaymentIntentById(
    session.payment_intent
  );
  const lineItems = await StripeApiService.getLineItemsBySessionId(session.id);

  const chargedId = paymentIntent.charges.data[0].id;

  for (const item of lineItems.data) {
    const sellerId = Number(item.price.product.metadata.sellerId);
    const account = await StripeModelService.findAccountByUserId(sellerId);

    StripeApiService.createTransfer({
      amount: item.amount_total,
      currency: 'usd',
      source_transaction: chargedId,
      destination: account.accountId,
    });
  }
}

export default transferPaymentsToSellersBySession;
