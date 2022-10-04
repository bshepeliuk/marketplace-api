import sequelize, { Op } from 'sequelize';
import models from '../database';

const PurchaseService = {
  findAllByUserId({
    userId,
    limit = 20,
    offset = 0,
    filters,
    sortDirection,
    sortField,
  }) {
    let where = { userId };

    let sorting =
      sortField === undefined
        ? [['updatedAt', 'DESC']]
        : [[sortField, sortDirection ?? 'DESC']];

    const orderDeviceWhere = {};

    if (filters.status !== undefined) {
      orderDeviceWhere.status = {
        [Op.or]: Array.isArray(filters.status)
          ? filters.status
          : [filters.status],
      };
    }

    if (filters.order !== undefined) {
      const entries = Object.entries(filters.order).map(([key, value]) => {
        if (key === 'id') return [key, value];

        return [
          key,
          sequelize.where(
            sequelize.fn('LOWER', sequelize.col(`Order.${key}`)),
            'LIKE',
            `%${value.toLowerCase()}%`
          ),
        ];
      });

      where = { ...where, ...Object.fromEntries(entries) };
    }

    return models.Order.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: sorting,
      where,
      include: [
        {
          model: models.Device,
          as: 'devices',
          include: [
            {
              model: models.DeviceInfo,
              as: 'info',
            },
            {
              model: models.Rating,
              as: 'ratings',
            },
            {
              model: models.DeviceImage,
              as: 'images',
            },
          ],
          through: {
            model: models.OrderDevice,
            as: 'orderDevice',
            where: orderDeviceWhere,
          },
        },
        {
          model: models.ShippingAddress,
          as: 'address',
        },
      ],
    });
  },
};

export default PurchaseService;
