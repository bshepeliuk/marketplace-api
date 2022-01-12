import models from '../database';

export const add = async (req, res) => {
  const { deviceId, url } = req.body;

  const image = await models.DeviceImage.create({ deviceId, url });

  res.status(200).send({ image });
};
