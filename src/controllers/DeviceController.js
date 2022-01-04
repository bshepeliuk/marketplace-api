import models from '../database';

export const add = async (req, res) => {
  const { name, price, brandId, typeId, rating, image, info } = req.body;

  const result = await models.Device.create(
    {
      name,
      price,
      brandId,
      typeId,
      rating,
      image,
      info,
    },
    {
      include: {
        model: models.DeviceInfo,
        as: 'info',
      },
    }
  );

  res.status(200).send(result);
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

  res.status(200).send(devices);
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
    ],
  });

  res.status(200).send({ device });
};