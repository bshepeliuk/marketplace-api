import models from '../database';
import PasswordService from './PasswordService';

const UserService = {
  create({ email, password, role, fullName }) {
    return models.User.create({ email, password, role, fullName });
  },
  getById(id) {
    return models.User.findOne({
      where: { id },
      attributes: ['fullName', 'email', 'role', 'id'],
      include: {
        model: models.Rating,
        as: 'ratings',
      },
    });
  },
  getByEmail(email) {
    return models.User.findOne({ where: { email } });
  },
  async isItUniqueEmail(email) {
    const user = await this.getByEmail(email);
    return !user;
  },
  async isNotUniqueEmail(email) {
    const isItUnique = await this.isItUniqueEmail(email);
    return !isItUnique;
  },
  async verifyCredentials({ email, password }) {
    const user = await this.getByEmail(email);

    if (user === null || user.email !== email) return false;

    const hasVerified = await PasswordService.verify({
      password,
      hash: user.password,
    });

    return hasVerified;
  },
};

export default UserService;
