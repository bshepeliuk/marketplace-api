import OrderService from '../services/OrderService';
import { StripeApiService } from '../services/StripeApiService';

async function createOrderByPaymentSession(session) {
  const lineItems = await StripeApiService.getLineItemsBySessionId(session.id);

  const orders = lineItems.data.map((item) => ({
    ...item.price.product.metadata,
    quantity: item.quantity,
  }));

  const order = OrderService.createOrderByStripeSession({
    session,
    orders,
  });

  return order;
}

export default createOrderByPaymentSession;
