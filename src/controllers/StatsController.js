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

  const devices = StatsService.getOrderDeviceAndQuantityRatio({
    filters,
    userId,
  });

  const status = StatsService.getOrderStatusAndQuantityRatio({
    filters,
    userId,
  });

  const categories = StatsService.getDeviceTypeAndPriceWithQuantityRatio({
    filters,
    userId,
  });

  const [devicesResult, statusResult, categoriesResult] = await Promise.all([
    devices,
    status,
    categories,
  ]);

  res.status(200).send({
    stats: {
      devices: devicesResult,
      status: statusResult,
      categories: categoriesResult,
    },
  });
};
