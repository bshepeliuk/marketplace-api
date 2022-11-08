import prepareOrderStats from '../utils/prepareOrderStats/prepareOrderStats';
import replaceTypeIdsWithLabel from '../utils/replaceTypeIdsWithLabel';
import OrderService from './OrderService';

const StatsService = {
  async getStats({ filters, userId }) {
    const orders = await OrderService.findAll({
      userId,
      filters,
    });

    const stats = prepareOrderStats(orders.rows);
    const categories = await replaceTypeIdsWithLabel(stats.categories);

    return {
      categories,
      devices: stats.devices,
      statuses: stats.statuses,
      customers: stats.customers,
      cities: stats.cities,
      orderTime: stats.time,
      orderMonth: stats.months,
    };
  },
};

export default StatsService;
