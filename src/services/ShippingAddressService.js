/* eslint-disable camelcase */
import models from '../database';

const ShippingAddressService = {
  create({ orderId, city, country, line1, line2, postal_code, state }) {
    return models.ShippingAddress.create({
      orderId,
      city,
      country,
      line1,
      line2,
      postal_code,
      state,
    });
  },
};

export default ShippingAddressService;
