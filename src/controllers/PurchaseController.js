import PurchaseService from '../services/PurchaseService';

export const getAll = async (req, res) => {
  const { offset, limit } = req.query;
  const { userId } = req.session.current;

  const { count, rows } = await PurchaseService.findAllByUserId({
    userId,
    limit,
    offset,
  });

  res.status(200).send({ total: count, purchases: rows });
};
