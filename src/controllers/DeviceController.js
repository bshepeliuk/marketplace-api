import DeviceService from '../services/DeviceService';
import parseDeviceFeatures from '../utils/parseDeviceFeatures';

export const add = async (req, res) => {
  const { name, price, brandId, typeId, quantity } = req.body;
  const { userId } = req.session.current;

  const device = await DeviceService.create({
    name,
    price,
    brandId,
    typeId,
    quantity,
    userId,
  });

  res.status(200).send({ device });
};

export const getAll = async (req, res) => {
  const {
    offset,
    limit,
    features,
    minPrice,
    maxPrice,
    categoryId: typeId,
  } = req.query;

  const filters = {
    minPrice,
    maxPrice,
    features: parseDeviceFeatures(features),
  };

  const devices = await DeviceService.findAll({
    offset,
    limit,
    typeId,
    filters,
  });

  res.status(200).send({ devices: devices.rows, count: devices.count });
};

export const getOne = async (req, res) => {
  const { deviceId } = req.params;

  const device = await DeviceService.findOneById(deviceId);

  res.status(200).send({ device });
};
