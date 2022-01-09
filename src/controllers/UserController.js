import UserService from '../services/UserService';

export const getAccountInfo = async (req, res) => {
  const { userId } = req.session.current;

  const user = await UserService.getById(userId);

  res.status(200).send({ user });
};
