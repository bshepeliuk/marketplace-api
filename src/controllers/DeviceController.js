import DeviceService from '../services/DeviceService';
import attachFeaturesToDeviceById from '../utils/attachFeaturesToDeviceById';
import attachUrlsToDeviceById from '../utils/attachUrlsToDeviceById';
import parseDeviceFeatures from '../utils/parseDeviceFeatures';
import uploadImgToCloudinary from '../utils/uploadImgToCloudinary';

export const add = async (req, res) => {
  const { userId } = req.session.current;

  const parsedBody = {
    info: JSON.parse(req.body.info.value),
    features: JSON.parse(req.body.features.value),
    categoryId: +req.body.categoryId.value,
    brandId: +req.body.brandId.value,
  };

  const [newDevice, urls] = await Promise.all([
    DeviceService.create({
      userId,
      name: parsedBody.info.name,
      quantity: +parsedBody.info.quantity,
      price: +parsedBody.info.price,
      typeId: parsedBody.categoryId,
      brandId: parsedBody.brandId,
    }),
    uploadImgToCloudinary(req.body.images),
  ]);

  await Promise.all([
    attachUrlsToDeviceById({ urls, deviceId: newDevice.id }),
    attachFeaturesToDeviceById({
      features: parsedBody.features,
      deviceId: newDevice.id,
      typeId: parsedBody.categoryId,
    }),
  ]);

  const device = await DeviceService.findOneById(newDevice.id);

  res.status(200).send({ device });
};

export const getAll = async (req, res) => {
  const {
    offset,
    limit,
    features,
    minPrice,
    maxPrice,
    name,
    categoryId: typeId,
  } = req.query;

  const filters = {
    minPrice,
    maxPrice,
    name,
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
