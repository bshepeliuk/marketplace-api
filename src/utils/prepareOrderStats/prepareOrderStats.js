import convertMapToObject from './helpers/convertMapToObject';
import getInitialMapValue from './helpers/getInitialMapValue';
import prepareCategoriesStats from './helpers/prepareCategoriesStats';
import prepareCitiesStats from './helpers/prepareCitiesStats';
import prepareCustomersStats from './helpers/prepareCustomersStats';
import prepareDayMonthStats from './helpers/prepareDayMonthStats';
import prepareDayTimeStats from './helpers/prepareDayTimeStats';
import prepareDevicesStats from './helpers/prepareDevicesStats';
import prepareStatusesStats from './helpers/prepareStatusesStats';
import replaceDayAndMonthIdxWithLabels from './helpers/replaceDayAndMonthIdxWithLabels';
import replaceDayIdxWithLabel from './helpers/replaceDayIdxWithLabel';

const prepareOrderStats = (orders) => {
  const map = new Map(getInitialMapValue());

  for (const order of orders) {
    for (const device of order.devices) {
      prepareDevicesStats({
        device,
        map: map.get('devices'),
        order: device.orderDevice,
      });

      prepareStatusesStats({
        device,
        map: map.get('statuses'),
        order: device.orderDevice,
      });

      prepareCustomersStats({
        device,
        order,
        map: map.get('customers'),
        orderDevice: device.orderDevice,
      });

      prepareCategoriesStats({
        device,
        orderDevice: device.orderDevice,
        map: map.get('categories'),
      });

      prepareDayMonthStats({
        device,
        order,
        orderDevice: device.orderDevice,
        map: map.get('months'),
      });

      prepareDayTimeStats({
        device,
        order,
        orderDevice: device.orderDevice,
        map: map.get('time'),
      });

      prepareCitiesStats({
        device,
        order,
        orderDevice: device.orderDevice,
        map: map.get('cities'),
      });
    }
  }

  const result = convertMapToObject(map);

  return {
    ...result,
    months: replaceDayAndMonthIdxWithLabels(result.months),
    time: replaceDayIdxWithLabel(result.time),
  };
};

export default prepareOrderStats;
