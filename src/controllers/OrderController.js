import OrderService from '../services/OrderService';
import getOrderFilterOptionsFromQueries from '../utils/getOrderFilterOptionsFromQueries';

export const create = async (req, res) => {
  const { userId, status } = req.body;

  const order = await OrderService.create({ userId, status });

  res.status(200).send({ order });
};

export const getAll = async (req, res) => {
  const {
    offset = 0,
    limit = 20,
    status,
    sortDirection,
    sortField,
    month,
    year,
  } = req.query;
  const { userId } = req.session.current;

  const order = getOrderFilterOptionsFromQueries(req.query);

  const months = Array.isArray(month) || month === undefined ? month : [month];

  const filters = {
    order,
    status,
    year,
    months,
  };

  const { count, rows } = await OrderService.findAll({
    userId,
    offset,
    limit,
    filters,
    sortDirection,
    sortField,
  });

  res.status(200).send({ total: count, orders: rows });
};

export const changeOrderStatus = async (req, res) => {
  const { id, status } = req.body;

  const orders = await OrderService.changeOrderStatus({ id, status });

  res.status(200).send({ orders });
};

export const getAvailableYearsOptions = async (req, res) => {
  const { userId } = req.session.current;

  const options = await OrderService.getAvailableYearOptions({ userId });

  res.status(200).send({ options });
};
