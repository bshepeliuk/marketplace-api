import CommentsService from '../services/CommentsService';

export const add = async (res, req) => {
  const { deviceId, body, fullName, parentId } = req.body;

  const comment = await CommentsService.create({
    deviceId,
    body,
    fullName,
    parentId,
  });

  res.status(200).send({
    comment,
  });
};

export const getAllByDeviceId = async (res, req) => {
  const { deviceId } = req.params;

  const comments = await CommentsService.findAllByDeviceId(deviceId);

  res.status(200).send({ comments });
};
