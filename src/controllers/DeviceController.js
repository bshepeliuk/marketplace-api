import models from '../database';
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
  const devices = await models.Device.findAll({
    include: [
      {
        model: models.DeviceInfo,
        as: 'info',
      },
      {
        model: models.Rating,
        as: 'ratings',
      },
    ],
  });

  res.status(200).send({ devices });
};

export const getOne = async (req, res) => {
  const { deviceId } = req.params;

  const device = await models.Device.findOne({
    where: { id: deviceId },
    include: [
      {
        model: models.DeviceInfo,
        as: 'info',
      },
      {
        model: models.Rating,
        as: 'ratings',
      },
      {
        model: models.DeviceImage,
        as: 'images',
      },
    ],
  });

  res.status(200).send({ device });
};
