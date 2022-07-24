import CommentsService from '../services/CommentsService';
import UserService from '../services/UserService';

export const add = async (req, res) => {
  const { userId } = req.session.current;
  const { deviceId, body, parentId } = req.body;

  const user = await UserService.getById(userId);
  const comment = await CommentsService.create({
    deviceId,
    body,
    parentId,
    fullName: user.fullName,
  });

  res.status(200).send({
    comment,
  });
};

export const getAllByDeviceId = async (req, res) => {
  const { deviceId } = req.params;

  const comments = await CommentsService.findAllByDeviceId(deviceId);

  res.status(200).send({ comments });
};

export const updateComment = async (req, res) => {
  const { body, commentId } = req.body;

  const [_, comment] = await CommentsService.updateById({ commentId, body });

  res.status(200).send({ comment });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  await CommentsService.deleteById(commentId);

  res.status(200).send({ message: 'Deleted!' });
};
