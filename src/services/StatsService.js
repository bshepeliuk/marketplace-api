import getDeviceCategoryStats from '../utils/getDeviceCategoryStats';
import getOrderDeviceStats from '../utils/getOrderDeviceStats';
import getOrderStatusStats from '../utils/getOrderStatusStats';
import OrderService from './OrderService';
import TypeService from './TypeService';

const StatsService = {
  async getOrderDeviceAndQuantityRatio({ filters, userId }) {
    const orders = await OrderService.findAll({
      userId,
      filters,
    });

    const result = getOrderDeviceStats(orders.rows);

    return result;
  },

  async getOrderStatusAndQuantityRatio({ filters, userId }) {
    const orders = await OrderService.findAll({
      userId,
      filters,
    });

    const result = getOrderStatusStats(orders.rows);

    return result;
  },
  async getDeviceTypeAndPriceWithQuantityRatio({ filters, userId }) {
    const orders = await OrderService.findAll({
      userId,
      filters,
    });

    const result = getDeviceCategoryStats(orders.rows);

    const types = await TypeService.findAll({
      ids: result.map((item) => item.typeId),
    });

    const stats = types.map((type) => {
      const typeStats = result.find((item) => item.typeId === type.id);

      return {
        ...typeStats,
        name: type.name,
      };
    });

    return stats;
  },
};

export default StatsService;
