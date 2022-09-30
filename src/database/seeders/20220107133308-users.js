import { users } from '../seeders_creators';
import PasswordService from '../../services/PasswordService';

export default {
  up: async (queryInterface) => {
    const hashedPassword = await PasswordService.hash('1234');

    const usersWithHashedPassword = [];

    for (const user of users) {
      usersWithHashedPassword.push({ ...user, password: hashedPassword });
    }

    await queryInterface.bulkInsert('Users', usersWithHashedPassword, {});

    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Users_id_seq" RESTART WITH ${usersWithHashedPassword.length +
        1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
