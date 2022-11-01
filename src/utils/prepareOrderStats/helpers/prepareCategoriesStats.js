const prepareCategoriesStats = ({ map, device, orderDevice }) => {
  const { price, typeId } = device;
  const { quantity } = orderDevice;

  const totalPrice = map.has(typeId) ? map.get(typeId).total + price : price;
  const totalQuantity = map.has(typeId)
    ? map.get(typeId).quantity + quantity
    : quantity;

  map.set(typeId, {
    typeId,
    total: totalPrice,
    quantity: totalQuantity,
  });
};

export default prepareCategoriesStats;
