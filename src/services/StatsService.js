import getDeviceCategoryStats from '../utils/getDeviceCategoryStats';
import getOrderCityStats from '../utils/getOrderCityStats';
import getOrderCustomerStats from '../utils/getOrderCustomerStats';
import getOrderDeviceStats from '../utils/getOrderDeviceStats';
import getOrderMonthDayStats from '../utils/getOrderMonthDayStats';
import getOrderStatusStats from '../utils/getOrderStatusStats';
import OrderService from './OrderService';
import TypeService from './TypeService';

const StatsService = {
  async getStats({ filters, userId }) {
    const orders = await OrderService.findAll({
      userId,
      filters,
    });

    const devices = getOrderDeviceStats(orders.rows);
    const statuses = getOrderStatusStats(orders.rows);
    const customers = getOrderCustomerStats(orders.rows);
    const cities = getOrderCityStats(orders.rows);
    const dates = getOrderMonthDayStats(orders.rows);

    // TODO:categories refactoring;
    const result = getDeviceCategoryStats(orders.rows);
    const types = await TypeService.findAll({
      ids: result.map((item) => item.typeId),
    });
    const categories = types.map((type) => {
      const typeStats = result.find((item) => item.typeId === type.id);

      return {
        ...typeStats,
        name: type.name,
      };
    });

    return {
      devices,
      statuses,
      categories,
      customers,
      cities,
      dates,
    };
  },
};

export default StatsService;
