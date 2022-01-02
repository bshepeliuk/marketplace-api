import PasswordService from '../services/PasswordService';
import UserService from '../services/UserService';
import { ApiError, BadRequestApiError } from '../utils/ApiErrors';
import attachUserPropsToSession from '../utils/attachUserPropsToSession';
import destroyAuthSession from '../utils/destroyAuthSession';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.getByEmail(email);
  const hasVerified = await UserService.verifyCredentials({
    email,
    password,
  });

  const canNotBeLoggedIn = !user || !hasVerified;

  if (canNotBeLoggedIn) {
    throw new BadRequestApiError('Email or password is not correct!');
  }

  attachUserPropsToSession(user, req.session);

  res.status(200).send({ user });
};

export const register = async (req, res) => {
  const { email, password, role, fullName } = req.body;

  const isNotUniqueEmail = await UserService.isNotUniqueEmail(email);

  if (isNotUniqueEmail) {
    throw new ApiError(409, 'Account with this email already exists.');
  }

  const hashedPassword = await PasswordService.hash(password);
  const user = await UserService.create({
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
};

export const logout = async (req, res) => {
  await destroyAuthSession(req);

  res.clearCookie('sessionId', { path: '/' });
  res.status(200).send({
    message: 'Successfully logged out.',
  });
};
