import PasswordService from '../services/PasswordService';
import { StripeApiService } from '../services/StripeApiService';
import { StripeModelService } from '../services/StripeModelService';
import UserService from '../services/UserService';
import { ApiError, BadRequestApiError } from '../utils/ApiErrors';
import attachUserPropsToSession from '../utils/attachUserPropsToSession';
import { isItProductionMode } from '../utils/checkEnvMode';
import destroyAuthSession from '../utils/destroyAuthSession';
import getStripeAccountByUserId from '../utils/getStripeAccountInfo';

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

  const stripeAccount = await getStripeAccountByUserId(user.id);

  res.status(200).send({ user, stripeAccount });
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

  const account = await StripeApiService.createAccount({ type: 'express' });

  StripeModelService.create({
    userId: user.id,
    accountId: account.id,
  });
  // TODO: get user object without password field
  res.status(200).send({
    user: {
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  });
};

export const logout = async (req, res) => {
  await destroyAuthSession(req);

  res.clearCookie('sessionId', {
    path: '/',
    sameSite: isItProductionMode ? 'none' : 'lax',
    secure: isItProductionMode,
    httpOnly: true,
  });

  res.status(200).send({
    message: 'Successfully logged out.',
  });
};
