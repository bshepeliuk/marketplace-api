import StatsService from '../services/StatsService';

export const getStatsByDevices = async (req, res) => {
  const { userId } = req.session.current;
  const { year, month, typeId } = req.query;

  const months = Array.isArray(month) || month === undefined ? month : [month];

  const filters = {
    typeId,
    year,
    months,
  };

  const stats = await StatsService.getStats({ filters, userId });

  res.status(200).send({
    stats,
  });
};
