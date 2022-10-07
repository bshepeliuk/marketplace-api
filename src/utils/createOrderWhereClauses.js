import sequelize, { Op } from 'sequelize';

const createOrderWhereClauses = ({
  userId,
  status,
  order,
  deviceName,
  deviceIds,
}) => {
  let orderWhere = {};
  const orderDeviceWhere = {};
  const deviceWhere = {};

  if (userId !== undefined) {
    orderWhere.userId = userId;
  }

  if (status !== undefined) {
    orderDeviceWhere.status = {
      [Op.or]: Array.isArray(status) ? status : [status],
    };
  }

  if (order !== undefined) {
    const entries = Object.entries(order).map(([key, value]) => {
      if (key === 'id') {
        return !Number.isNaN(Number(value)) && typeof Number(value) === 'number'
          ? [key, value]
          : undefined;
      }

      return [
        key,
        sequelize.where(
          sequelize.fn('LOWER', sequelize.col(`Order.${key}`)),
          'LIKE',
          `%${value.toLowerCase()}%`
        ),
      ];
    });

    orderWhere = {
      ...orderWhere,
      ...Object.fromEntries(entries.filter((item) => item !== undefined)),
    };
  }

  if (deviceName !== undefined) {
    deviceWhere.name = sequelize.where(
      sequelize.fn('LOWER', sequelize.col('name')),
      'LIKE',
      `%${deviceName.toLowerCase()}%`
    );
  }

  if (Array.isArray(deviceIds) && deviceIds.length !== 0) {
    deviceWhere.id = deviceIds;
  }

  return {
    Order: orderWhere,
    Device: deviceWhere,
    OrderDevice: orderDeviceWhere,
  };
};

export default createOrderWhereClauses;
