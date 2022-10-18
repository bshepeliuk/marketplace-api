import sequelize from 'sequelize';
import models from '../database';
import PurchaseService from '../services/PurchaseService';
import getOrderFilterOptionsFromQueries from '../utils/getOrderFilterOptionsFromQueries';

export const getAll = async (req, res) => {
  const {
    offset,
    limit,
    status,
    sortDirection,
    sortField,
    deviceName,
    month,
    year,
  } = req.query;
  const { userId } = req.session.current;

  const order = getOrderFilterOptionsFromQueries(req.query);

  const months = Array.isArray(month) || month === undefined ? month : [month];

  const filters = {
    order,
    status,
    deviceName,
    year,
    months,
  };
  // TODO: refactoring;
  const dates = await models.Order.findAll({
    where: { userId },
    attributes: [
      [
        sequelize.fn('date_trunc', 'year', sequelize.col('Order.createdAt')),
        'fullDate',
      ],
    ],
    include: [
      {
        model: models.Device,
        as: 'devices',
        attributes: [],
        through: {
          model: models.OrderDevice,
          as: 'orderDevice',
          attributes: [],
        },
      },
    ],
    raw: true,
    group: ['fullDate'],
  });

  const { count, rows } = await PurchaseService.findAllByUserId({
    userId,
    offset,
    limit,
    filters,
    sortDirection,
    sortField,
  });

  res.status(200).send({ total: count, purchases: rows, dates });
};

export const getAvailableYearsOptions = async (req, res) => {
  const { userId } = req.session.current;

  const options = await PurchaseService.getAvailableYearOptions({ userId });

  res.status(200).send({ options });
};
