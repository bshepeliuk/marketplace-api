import PurchaseService from '../services/PurchaseService';

export const getAll = async (req, res) => {
  const { userId } = req.session.current;

  const purchases = await PurchaseService.findAllByUserId({ userId });

  res.status(200).send({ purchases });
};
