import getDeviceCategoryStats from '../utils/getDeviceCategoryStats';
import prepareOrderStats from '../utils/prepareOrderStats';
import OrderService from './OrderService';
import TypeService from './TypeService';

const StatsService = {
  async getStats({ filters, userId }) {
    const orders = await OrderService.findAll({
      userId,
      filters,
    });

    const stats = prepareOrderStats(orders.rows);
    // TODO:categories refactoring;
    const result = getDeviceCategoryStats(orders.rows);
    const types = await TypeService.findAll({
      ids: stats.categories.map((item) => item.typeId),
    });
    const categories = types.map((type) => {
      const typeStats = result.find((item) => item.typeId === type.id);

      return {
        ...typeStats,
        name: type.name,
      };
    });

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
