import DeviceDetailsService from '../services/DeviceDetailsService';
import DeviceService from '../services/DeviceService';
import getUniqueObjFromArrayByKey from '../utils/getUniqueObjFromArrayByKey';

export const getDeviceFiltersByTypeId = async (req, res) => {
  const { typeId } = req.params;

  const details = await DeviceDetailsService.findAll({ typeId });
  const prices = await DeviceService.getMaxAndMinPricesByTypeId(typeId);

  const options = getUniqueObjFromArrayByKey(details, 'description');

  res.status(200).send({ options, prices });
};
