import DeviceInfoService from '../services/DeviceInfoService';
import DeviceService from '../services/DeviceService';
import getUniqueObjFromArrayByKey from '../utils/getUniqueObjFromArrayByKey';

export const getDeviceFiltersByTypeId = async (req, res) => {
  const { typeId } = req.params;

  const details = await DeviceInfoService.findAll({ typeId });
  const prices = await DeviceService.getMaxAndMinPricesByTypeId(typeId);

  const options = getUniqueObjFromArrayByKey(details, 'description');

  res.status(200).send({ options, prices });
};
