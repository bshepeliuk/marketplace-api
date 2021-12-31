import models from '../database';
import PasswordService from './PasswordService';

const UserService = {
  create({ email, password, role, fullName }) {
    return models.User.create({ email, password, role, fullName });
  },
  getById(id) {
    return models.User.findOne({ where: { id } });
  },
  getByEmail(email) {
    return models.User.findOne({ where: { email } });
  },
  async isItUniqueEmail(email) {
    const user = await this.getByEmail(email);
    return !user;
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
  // only for tests
  async removeAllUsers() {
    await models.User.destroy({ where: {} });
  },
};

export default UserService;
