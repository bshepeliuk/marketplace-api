import DeviceService from '../services/DeviceService';

export const add = async (req, res) => {
  const { name, price, brandId, typeId, quantity } = req.body;

  const device = await DeviceService.create({
    name,
    price,
    brandId,
    typeId,
    quantity,
  });

  res.status(200).send({ device });
};

export const getAll = async (req, res) => {
  const { offset, limit, categoryId: typeId } = req.query;

  const devices = await DeviceService.findAll({ offset, limit, typeId });

  res.status(200).send({ devices });
};

export const getOne = async (req, res) => {
  const { deviceId } = req.params;

  const device = await DeviceService.findOneById(deviceId);

  res.status(200).send({ device });
};
