/* eslint-disable camelcase */
import ShippingAddressService from '../services/ShippingAddressService';

const addShippingAddressByOrderId = ({ orderId, address }) => {
  const { city, country, line1, line2, postal_code, state } = address;

  return ShippingAddressService.create({
    orderId: orderId,
    city,
    country,
    line1,
    line2,
    postal_code,
    state,
  });
};

export default addShippingAddressByOrderId;
