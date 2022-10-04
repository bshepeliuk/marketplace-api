import PurchaseService from '../services/PurchaseService';
import getOrderFilterOptionsFromQueries from '../utils/getOrderFilterOptionsFromQueries';

export const getAll = async (req, res) => {
  const { offset, limit, status, sortDirection, sortField } = req.query;
  const { userId } = req.session.current;

  const order = getOrderFilterOptionsFromQueries(req.query);

  const filters = {
    order,
    status,
  };

  const { count, rows } = await PurchaseService.findAllByUserId({
    userId,
    offset,
    limit,
    filters,
    sortDirection,
    sortField,
  });

  res.status(200).send({ total: count, purchases: rows });
};
