import PasswordService from '../services/PasswordService';
import UserService from '../services/UserService';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.getByEmail(email);

    if (!user) {
      res.status(400).send({
        message: 'Email or password is incorrect.',
      });

      return;
    }

    const hasVerified = await UserService.verifyCredentials({
      email,
      password,
    });

    if (!hasVerified) {
      res.status(400).send({
        message: 'Email or password is incorrect.',
      });

      return;
    }
    // TODO: refactoring
    req.session.current = {
      userId: user.id,
      role: user.role,
      isLoggedIn: true,
    };

    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { email, password, role, fullName } = req.body;

  try {
    const isEmailUnique = await UserService.isItUniqueEmail(email);

    if (isEmailUnique) {
      const hashedPassword = await PasswordService.hash(password);
      const user = await UserService.add({
        email,
        fullName,
        role,
        password: hashedPassword,
      });

      res.status(200).send({
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      });

      return;
    }

    res.code(409).send({
      message: 'Account with this email already exists.',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    req.sessionStore.destroy(req.session.sessionId, (err) => {
      if (err) {
        res.status(400).send({
          message: 'Failed to log out.',
        });

        return;
      }

      req.session = null;
      res.clearCookie('sessionId', { path: '/' });

      res.status(200).send({
        message: 'Successfully logged out.',
      });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
