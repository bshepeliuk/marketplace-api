import OrderService from '../services/OrderService';
import { StripeApiService } from '../services/StripeApiService';
import addShippingAddressByOrderId from './addShippingAddressByOrderId';

async function createOrderByPaymentSession(session) {
  const lineItems = await StripeApiService.getLineItemsBySessionId(session.id);

  const orders = lineItems.data.map((item) => ({
    ...item.price.product.metadata,
    quantity: item.quantity,
  }));

  const order = await OrderService.createOrderByStripeSession({
    session,
    orders,
  });

  addShippingAddressByOrderId({
    orderId: order.id,
    address: session.shipping.address,
  });

  return order;
}

export default createOrderByPaymentSession;
